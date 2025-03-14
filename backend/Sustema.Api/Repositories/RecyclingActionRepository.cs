using Microsoft.EntityFrameworkCore;
using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    public class RecyclingActionRepository : Repository<RecyclingAction>, IRecyclingActionRepository
    {
        public RecyclingActionRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<RecyclingAction>> GetActionsByUserAsync(int userId)
        {
            return await _dbSet.Where(ra => ra.UserId == userId).ToListAsync();
        }
    }
}
