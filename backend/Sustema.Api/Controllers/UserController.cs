using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Repositories;
using Microsoft.IdentityModel.Tokens;
using Sustema.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Sustema.Api.Helpers;
using Sustema.Api.Models.DTOs;
using Sustema.Api.Interfaces.Services;
using Sustema.Api.Services;

namespace Sustema.Api.Controllers
{
    /// <summary>
    /// Controlador responsável por gerenciar as operações de usuários, como registro e autenticação.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        /// <summary>
        /// Inicializa uma nova instância do <see cref="UserController"/>.
        /// </summary>
        /// <param name="userRepository">Repositório de usuários.</param>
        /// <param name="configuration">Configurações da aplicação.</param>
        /// <param name="userService">Serviço de usuários.</param>
        public UserController(IUserRepository userRepository, IConfiguration configuration, IUserService userService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _userService = userService;
        }

        /// <summary>
        /// Registra um novo usuário no sistema.
        /// </summary>
        /// <param name="request">Dados do usuário para registro.</param>
        /// <returns>Mensagem de sucesso ou erro de validação.</returns>
        /// <response code="201">Usuário registrado com sucesso.</response>
        /// <response code="400">Dados inválidos.</response>
        [HttpPost("register")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterUserAsync(request);


            //return Ok(new {message = "Usuário cadastrado com sucesso" });
            return result.Result switch
            {
                RegisterUserResult.Success => CreatedAtAction(nameof(GetUser), new { id = result.User!.Id }, result.User),
                RegisterUserResult.EmailAlreadyExists => Conflict(new { error = "Já existe um usuário com esse e-mail." }),
                _ => StatusCode(500, new { error = "Erro interno ao criar o usuário." })
            };
        }

        // POST: api/User/login
        /// <summary>
        /// Autentica um usuário e retorna um token JWT.
        /// </summary>
        /// <param name="loginRequest">Dados de autenticação (email e senha).</param>
        /// <returns>Token JWT se as credenciais forem válidas.</returns>
        /// <response code="200">Token JWT gerado com sucesso.</response>
        /// <response code="400">Dados inválidos.</response>
        /// <response code="401">Credenciais inválidas ou usuário não encontrado.</response>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userRepository.GetUserByEmailAsync(loginRequest.Email);
            if (user == null)
                return Unauthorized("Usuário não encontrado.");

            // Verifica a senha usando o método VerifyPassword do PasswordHelper
            bool senhaValida = PasswordHelper.VerifyPassword(loginRequest.Password, user.PasswordHash);
            if (!senhaValida)
                return Unauthorized("Credenciais inválidas.");

            // Geração do token JWT (código de geração permanece o mesmo)
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);
            var tokenDescriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Perfil.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiryMinutes"])),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { token = tokenHandler.WriteToken(token) });
        }

        // GET: api/User/{id}
        /// <summary>
        /// Busca um usuário pelo ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Usuário não encontrado!" });
            }

            var userDto = new UserDto
            {
                Nome = user.Nome,
                Email = user.Email,
                Perfil = user.Perfil
            };

            return Ok(new {data = userDto });
        }

        /// <summary>
        /// Método para buscar todos os Usuários
        /// </summary>
        /// <returns>Retorna todos os usuários cadastrados no Banco de Dados</returns>
        [HttpGet("all")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();

            return Ok(users);
        }

        ///// <summary>
        ///// Retorna a view para atualizacao do usuario
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //[HttpGet("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<IActionResult> UpdateUser(int id)
        //{
        //    var user = await _userRepository.GetByIdAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound(new { message = "Usuário não encontrado!" });
        //    }

        //    var userDto = new UserDto
        //    {
        //        Id = user.UserId,
        //        Email = user.Email,
        //        Perfil = user.Perfil,
        //        Nome = user.Nome
        //    };

        //    return Ok(userDto);
        //}

        /// <summary>
        /// Atualiza dados de um Usuário.
        /// </summary>
        /// <param name="id">Id do usuário a ser atualizado</param>
        /// <param name="userDto">Novos dados do usuario</param>
        /// <returns>Retorna `NoContent` se atualizado com sucesso.</returns>
        /// <response code="204">Usuário atualizado com sucesso.</response>
        /// <response code="400">Dados Invalidos.</response>
        /// <response code="404">Usuario nao encontrado.</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetByIdAsync(id);

            if (user != null)
            {
                user.Email = userDto.Email;
                user.Nome = userDto.Nome;

                _userRepository.Update(user);
                await _userRepository.SaveChangesAsync();

                return NoContent();
            }

            return NotFound(new 
            { 
                message = "Usuário não encontrado!", 
                data = userDto 
            });
        }
    }
}
