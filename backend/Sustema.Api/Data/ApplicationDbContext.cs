using Microsoft.EntityFrameworkCore;

namespace Sustema.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }


    }
}
