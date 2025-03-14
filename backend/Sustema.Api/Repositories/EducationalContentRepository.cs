using Sustema.Api.Data;
using Sustema.Api.Models;

namespace Sustema.Api.Repositories
{
    public class EducationalContentRepository : Repository<EducationalContent>, IEducationalContentRepository
    {
        public EducationalContentRepository(ApplicationDbContext context) : base(context) { }
        // Implementação de métodos adicionais, se necessário.
    }
}
