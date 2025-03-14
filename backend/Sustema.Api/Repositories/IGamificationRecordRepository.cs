using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    public interface IGamificationRecordRepository : IRepository<GamificationRecord>
    {
        Task<GamificationRecord> GetRecordByUserIdAsync(int userId);
    }
}
