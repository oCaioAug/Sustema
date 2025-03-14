using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    public class CollectionPointRepository : Repository<CollectionPoint>, ICollectionPointRepository
    {
        public CollectionPointRepository(ApplicationDbContext context) : base(context) { }
        // Implementação de métodos adicionais, se necessário.
    }
}
