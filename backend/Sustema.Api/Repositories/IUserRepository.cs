using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    /// <summary>
    /// Interface for user repository operations.
    /// </summary>
    public interface IUserRepository : IRepository<User>
    {
        /// <summary>
        /// Retrieves a user by their email address.
        /// </summary>
        /// <param name="email">The email address of the user.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the user.</returns>
        Task<User> GetUserByEmailAsync(string email);
    }
}
