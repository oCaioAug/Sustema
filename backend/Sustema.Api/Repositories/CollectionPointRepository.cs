using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    /// <summary>
    /// Repository for managing CollectionPoint entities.
    /// </summary>
    public class CollectionPointRepository : Repository<CollectionPoint>, ICollectionPointRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CollectionPointRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public CollectionPointRepository(ApplicationDbContext context) : base(context) { }
        // Implementação de métodos adicionais, se necessário.
    }
}
