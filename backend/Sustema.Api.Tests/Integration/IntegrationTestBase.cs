using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Sustema.Api.Data;
using System.Net.Http;
using Xunit;

namespace Sustema.Api.Tests.Integration
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Remove todos os serviços relacionados ao ApplicationDbContext
                var dbContextDescriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
                if (dbContextDescriptor != null)
                    services.Remove(dbContextDescriptor);

                var dbContextServiceDescriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(ApplicationDbContext));
                if (dbContextServiceDescriptor != null)
                    services.Remove(dbContextServiceDescriptor);

                // Remove serviços do Entity Framework que podem estar registrados
                var efDescriptors = services.Where(d => 
                    d.ServiceType.FullName != null && 
                    d.ServiceType.FullName.Contains("EntityFramework")).ToList();
                
                foreach (var descriptor in efDescriptors)
                {
                    services.Remove(descriptor);
                }

                // Adiciona um banco de dados em memória para testes
                services.AddDbContext<ApplicationDbContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting");
                });

                // Garante que o banco de dados seja criado
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var scopedServices = scope.ServiceProvider;
                var db = scopedServices.GetRequiredService<ApplicationDbContext>();
                db.Database.EnsureCreated();
            });
        }
    }

    public class IntegrationTestBase : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        protected readonly HttpClient _client;
        protected readonly CustomWebApplicationFactory<Program> _factory;

        public IntegrationTestBase(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }
    }
}