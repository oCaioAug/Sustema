using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Sustema.Api.Models;
using Sustema.Api.Models.DTOs;
using Xunit;

namespace Sustema.Api.Tests.Integration
{
    public class CollectionPointIntegrationTests : IntegrationTestBase
    {
        public CollectionPointIntegrationTests(CustomWebApplicationFactory<Program> factory) : base(factory)
        {
        }

        [Fact]
        public async Task GetCollectionPoints_ReturnsSuccessAndCorrectContentType()
        {
            // Act
            var response = await _client.GetAsync("/api/collectionpoint");

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8", 
                response.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task CreateCollectionPoint_ValidData_ReturnsCreated()
        {
            // Arrange
            var collectionPoint = new CollectionPoint
            {
                Nome = "Ponto de Teste Integração",
                Endereco = "Rua de Teste, 123",
                Latitude = -23.5505,
                Longitude = -46.6333,
                Descricao = "Ponto criado durante teste de integração"
            };

            var json = JsonSerializer.Serialize(collectionPoint);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/collectionpoint", content);

            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task GetCollectionPointById_ExistingId_ReturnsOk()
        {
            // Arrange - Primeiro cria um ponto de coleta
            var collectionPoint = new CollectionPoint
            {
                Nome = "Ponto para Busca",
                Endereco = "Rua da Busca, 456",
                Latitude = -23.5506,
                Longitude = -46.6334,
                Descricao = "Ponto para teste de busca"
            };

            var createResponse = await _client.PostAsJsonAsync("/api/collectionpoint", collectionPoint);
            createResponse.EnsureSuccessStatusCode();
            var createdPoint = await createResponse.Content.ReadFromJsonAsync<CollectionPoint>();

            // Act
            var response = await _client.GetAsync($"/api/collectionpoint/{createdPoint!.CollectionPointId}");

            // Assert
            response.EnsureSuccessStatusCode();
            var returnedPoint = await response.Content.ReadFromJsonAsync<dynamic>();
            Assert.NotNull(returnedPoint);
        }

        [Fact]
        public async Task GetCollectionPointById_NonExistingId_ReturnsNotFound()
        {
            // Act
            var response = await _client.GetAsync("/api/collectionpoint/999999");

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}