using Sustema.Api.Interfaces.Services;
using Sustema.Api.Models.DTOs;
using Sustema.Api.Repositories;

namespace Sustema.Api.Services
{
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
        /// Busca Usuário pelo Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);

            return user == null ? null : new UserDto { Id = user.UserId, Nome = user.Nome, Email = user.Email, Perfil = user.Perfil};
        }
    }
}
