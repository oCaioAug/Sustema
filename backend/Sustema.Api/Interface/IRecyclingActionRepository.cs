using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    public interface IRecyclingActionRepository : IRepository<RecyclingAction>
    {
        Task<IEnumerable<RecyclingAction>> GetActionsByUserAsync(int userId);
    }
}
