using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    /// <summary>
    /// Repository for managing educational content.
    /// </summary>
    public class EducationalContentRepository : Repository<EducationalContent>, IEducationalContentRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="EducationalContentRepository"/> class.
        /// </summary>
        /// <param name="context">The application database context.</param>
        public EducationalContentRepository(ApplicationDbContext context) : base(context) { }
        // Implementação de métodos adicionais, se necessário.
    }
}
