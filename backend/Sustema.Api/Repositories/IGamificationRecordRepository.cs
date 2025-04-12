using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    /// <summary>
    /// Interface for GamificationRecord repository.
    /// </summary>
    public interface IGamificationRecordRepository : IRepository<GamificationRecord>
    {
        /// <summary>
        /// Gets the gamification record by user ID.
        /// </summary>
        /// <param name="userId">The user ID.</param>
        /// <returns>The gamification record.</returns>
        Task<GamificationRecord> GetRecordByUserIdAsync(int userId);
    }
}
