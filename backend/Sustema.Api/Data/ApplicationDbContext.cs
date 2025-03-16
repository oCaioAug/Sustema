using Microsoft.EntityFrameworkCore;
using Sustema.Api.Models;

namespace Sustema.Api.Data
{
    /// <summary>
    /// Contexto de banco de dados para o EcoTech API, utilizando o Entity Framework Core.
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        /// <summary>
        /// Construtor que recebe as opções de configuração do contexto.
        /// </summary>
        /// <param name="options">Opções de configuração do DbContext.</param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Representa a tabela de usuários.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Representa a tabela de pontos de coleta.
        /// </summary>
        public DbSet<CollectionPoint> CollectionPoints { get; set; }

        /// <summary>
        /// Representa a tabela de ações de reciclagem.
        /// </summary>
        public DbSet<RecyclingAction> RecyclingActions { get; set; }

        /// <summary>
        /// Representa a tabela de registros de gamificação.
        /// </summary>
        public DbSet<GamificationRecord> GamificationRecords { get; set; }

        /// <summary>
        /// Representa a tabela de conteúdos educativos.
        /// </summary>
        public DbSet<EducationalContent> EducationalContents { get; set; }

        /// <summary>
        /// Configura as relações e outras configurações de mapeamento utilizando o Fluent API.
        /// </summary>
        /// <param name="modelBuilder">Construtor do modelo.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RecyclingAction>()
                .HasOne(ra => ra.User)
                .WithMany(u => u.RecyclingActions)
                .HasForeignKey(ra => ra.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RecyclingAction>()
                .HasOne(ra => ra.CollectionPoint)
                .WithMany(cp => cp.RecyclingActions)
                .HasForeignKey(ra => ra.CollectionPointId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GamificationRecord>()
                .HasOne(gr => gr.User)
                .WithMany(u => u.GamificationRecords)
                .HasForeignKey(gr => gr.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
