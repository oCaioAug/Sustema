using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    /// <summary>
    /// Interface for Recycling Action Repository
    /// </summary>
    public interface IRecyclingActionRepository : IRepository<RecyclingAction>
    {
        /// <summary>
        /// Gets the recycling actions by user asynchronously.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains a collection of recycling actions.</returns>
        Task<IEnumerable<RecyclingAction>> GetActionsByUserAsync(int userId);
    }
}
