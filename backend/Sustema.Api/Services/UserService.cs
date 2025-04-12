using Sustema.Api.Helpers;
using Sustema.Api.Interfaces.Services;
using Sustema.Api.Models;
using Sustema.Api.Models.DTOs;
using Sustema.Api.Repositories;

namespace Sustema.Api.Services
{
    /// <summary>
    /// Resultado do registro de usuário.
    /// </summary>
    public enum RegisterUserResult
    {
        Success,
        EmailAlreadyExists,
        Error
    }

    /// <summary>
    /// Serviço responsável pelo gerenciamento de usuários.
    /// </summary>
    public class UserService : IUserService
    {
        /// <summary>
        /// Construtor do serviço de usuário.
        /// </summary>
        public readonly IUserRepository _userRepository;

        /// <summary>
        /// Construtor da classe
        /// </summary>
        /// <param name="userRepository"></param>
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// <summary>
        /// Busca todos os usuários
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();

            return users.Select(user => new UserDto
            {
                Id = user.UserId,
                Nome = user.Nome,
                Email = user.Email,
                Perfil = user.Perfil
            });
        }

        /// <summary>
        /// Busca Usuário pelo Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            return user == null ? null : new UserDto 
            { 
                Id = user.UserId, 
                Nome = user.Nome,
                Email = user.Email, 
                Perfil = user.Perfil
            };
        }

        /// <summary>
        /// Registra um novo usuário.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<(RegisterUserResult Result, UserDto? User)> RegisterUserAsync(RegisterRequest request)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return (RegisterUserResult.EmailAlreadyExists, null);
            }

            var user = new User
            {
                Nome = request.Nome,
                Email = request.Email,
                PasswordHash = PasswordHelper.HashPassword(request.Password),
                Perfil = request.Perfil,
                DataCadastro = DateTime.UtcNow
            };

            try
            {
                await _userRepository.AddAsync(user);
                await _userRepository.SaveChangesAsync();

                var userDto = new UserDto
                {
                    Id = user.UserId,
                    Nome = user.Nome,
                    Email = user.Email,
                    Perfil = user.Perfil
                };

                return (RegisterUserResult.Success, userDto);
            }
            catch (Exception)
            {
                return (RegisterUserResult.Error, null);
            }
        }

        /// <summary>
        /// Deleta um usuário pelo Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
            {
                return false;
            }

            await _userRepository.DeleteAsync(user);

            return true;
        }

        public async Task<(bool Success, UserDto? User)> UpdateUserAsync(int id, UserUpdateDto request)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                return (false, null);

            user.Nome = request.Nome;
            user.Email = request.Email;

            try
            {
                await _userRepository.UpdateAsync(user);

                var updatedUser = new UserDto
                {
                    Id = user.UserId,
                    Nome = user.Nome,
                    Email = user.Email,
                    Perfil = user.Perfil
                };

                return (true, updatedUser);
            }
            catch (Exception)
            {
                return (false, null);
            }
        }

    }
}
