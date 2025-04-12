using Microsoft.EntityFrameworkCore;
using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    /// <summary>
    /// Repository for managing GamificationRecord entities.
    /// </summary>
    public class GamificationRecordRepository : Repository<GamificationRecord>, IGamificationRecordRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GamificationRecordRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public GamificationRecordRepository(ApplicationDbContext context) : base(context) { }

        /// <summary>
        /// Gets a gamification record by user ID.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The gamification record for the specified user ID.</returns>
        public async Task<GamificationRecord> GetRecordByUserIdAsync(int userId)
        {
            return await _dbSet.FirstOrDefaultAsync(gr => gr.UserId == userId);
        }
    }
}
