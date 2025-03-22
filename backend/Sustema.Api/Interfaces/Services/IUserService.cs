﻿using Sustema.Api.Models.DTOs;
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
        Task<(RegisterUserResult Result, UserDto? User)> RegisterUserAsync(RegisterRequest request);
    }
}
