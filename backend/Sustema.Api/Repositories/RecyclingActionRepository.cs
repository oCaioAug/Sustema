using Microsoft.EntityFrameworkCore;
using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    /// <summary>
    /// Repository for managing recycling actions.
    /// </summary>
    public class RecyclingActionRepository : Repository<RecyclingAction>, IRecyclingActionRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RecyclingActionRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public RecyclingActionRepository(ApplicationDbContext context) : base(context) { }

        /// <summary>
        /// Gets the recycling actions by user asynchronously.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the collection of recycling actions.</returns>
        public async Task<IEnumerable<RecyclingAction>> GetActionsByUserAsync(int userId)
        {
            return await _dbSet.Where(ra => ra.UserId == userId).ToListAsync();
        }
    }
}
