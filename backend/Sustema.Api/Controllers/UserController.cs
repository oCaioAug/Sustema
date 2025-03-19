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
        /// <response code="200">Usuário registrado com sucesso.</response>
        /// <response code="400">Dados inválidos.</response>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Cria a entidade User e aplica o hash na senha
            var user = new User
            {
                Nome = request.Nome,
                Email = request.Email,
                PasswordHash = PasswordHelper.HashPassword(request.Password),
                Perfil = request.Perfil,
                DataCadastro = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return Ok(new {message = "Usuário cadastrado com sucesso" });
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
        [HttpGet("{id}")]
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

            return Ok(userDto);
        }

        /// <summary>
        /// Método para buscar todos os Usuários
        /// </summary>
        /// <returns>Retorna todos os usuários cadastrados no Banco de Dados</returns>
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();

            return Ok(users);
        }
    }
}
