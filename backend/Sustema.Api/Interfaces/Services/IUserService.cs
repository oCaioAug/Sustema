#nullable enable

using Sustema.Api.Models;
using Sustema.Api.Models.DTOs;
using Sustema.Api.Services;

namespace Sustema.Api.Interfaces.Services
{
    /// <summary>
    /// Interface para Service Usuario
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Busca um usuário pelo Id
        /// </summary>
        /// <param name="id">Id do usuario</param>
        /// <returns>UserDto usuario</returns>
        Task<UserDto> GetUserByIdAsync(int id);
        /// <summary>
        /// Busca todos os usuários
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        /// <summary>
        /// Registra um novo usuário
        /// </summary>
        /// <param name="request">Dados do usuário a ser registrado</param>
        /// <returns>Resultado do registro e o usuário registrado</returns>
        Task<(RegisterUserResult Result, UserDto? User)> RegisterUserAsync(RegisterRequest request);
        /// <summary>
        /// Deleta um usuário pelo Id
        /// </summary>
        /// <param name="id">Id do usuario</param>
        /// <returns>Booleano indicando sucesso ou falha</returns>
        Task<bool> DeleteUserAsync(int id);
        /// <summary>
        /// Atualiza um usuário pelo Id
        /// </summary>
        /// <param name="id">Id do usuario</param>
        /// <param name="request">Dados do usuário a ser atualizado</param>
        /// <returns>Booleano indicando sucesso ou falha e o usuário atualizado</returns>
        Task<(bool Success, UserDto? User)> UpdateUserAsync(int id, UserUpdateDto request);
    }
}
