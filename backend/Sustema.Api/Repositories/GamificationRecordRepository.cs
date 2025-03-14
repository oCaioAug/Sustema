using Microsoft.EntityFrameworkCore;
using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    public class GamificationRecordRepository : Repository<GamificationRecord>, IGamificationRecordRepository
    {
        public GamificationRecordRepository(ApplicationDbContext context) : base(context) { }

        public async Task<GamificationRecord> GetRecordByUserIdAsync(int userId)
        {
            return await _dbSet.FirstOrDefaultAsync(gr => gr.UserId == userId);
        }
    }
}
