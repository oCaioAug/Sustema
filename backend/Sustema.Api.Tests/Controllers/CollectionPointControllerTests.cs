using Microsoft.AspNetCore.Mvc;
using Moq;
using Sustema.Api.Controllers;
using Sustema.Api.Models;
using Sustema.Api.Models.DTOs;
using Sustema.Api.Repositories;
using Xunit;

namespace Sustema.Api.Tests.Controllers
{
    public class CollectionPointControllerTests
    {
        private readonly Mock<IRepository<CollectionPoint>> _mockRepository;
        private readonly CollectionPointController _controller;

        public CollectionPointControllerTests()
        {
            _mockRepository = new Mock<IRepository<CollectionPoint>>();
            _controller = new CollectionPointController(_mockRepository.Object);
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var collectionPoints = new List<CollectionPoint>
            {
                new CollectionPoint
                {
                    CollectionPointId = 1,
                    Nome = "Ponto 1",
                    Endereco = "Endereço 1",
                    Latitude = -23.5505,
                    Longitude = -46.6333,
                    Descricao = "Descrição 1"
                },
                new CollectionPoint
                {
                    CollectionPointId = 2,
                    Nome = "Ponto 2",
                    Endereco = "Endereço 2",
                    Latitude = -23.5506,
                    Longitude = -46.6334,
                    Descricao = "Descrição 2"
                }
            };

            _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(collectionPoints);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetById_ExistingId_ReturnsOkResult()
        {
            // Arrange
            var collectionPointId = 1;
            var collectionPoint = new CollectionPoint
            {
                CollectionPointId = collectionPointId,
                Nome = "Ponto Teste",
                Endereco = "Endereço Teste",
                Latitude = -23.5505,
                Longitude = -46.6333,
                Descricao = "Descrição Teste"
            };

            _mockRepository.Setup(x => x.GetByIdAsync(collectionPointId)).ReturnsAsync(collectionPoint);

            // Act
            var result = await _controller.GetById(collectionPointId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetById_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var collectionPointId = 999;
            _mockRepository.Setup(x => x.GetByIdAsync(collectionPointId)).ReturnsAsync((CollectionPoint?)null);

            // Act
            var result = await _controller.GetById(collectionPointId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task Create_ValidCollectionPoint_ReturnsCreatedResult()
        {
            // Arrange
            var collectionPoint = new CollectionPoint
            {
                Nome = "Novo Ponto",
                Endereco = "Novo Endereço",
                Latitude = -23.5505,
                Longitude = -46.6333,
                Descricao = "Nova Descrição"
            };

            _mockRepository.Setup(x => x.AddAsync(It.IsAny<CollectionPoint>())).Returns(Task.CompletedTask);
            _mockRepository.Setup(x => x.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Create(collectionPoint);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(collectionPoint, createdResult.Value);
        }

        [Fact]
        public async Task UpdateCollectionPoint_ExistingId_ReturnsNoContent()
        {
            // Arrange
            var collectionPointId = 1;
            var existingPoint = new CollectionPoint
            {
                CollectionPointId = collectionPointId,
                Nome = "Ponto Original",
                Endereco = "Endereço Original",
                Latitude = -23.5505,
                Longitude = -46.6333,
                Descricao = "Descrição Original"
            };

            var updateDto = new UpdateCollectionPointDto
            {
                Nome = "Ponto Atualizado",
                Endereco = "Endereço Atualizado",
                Latitude = -23.5507,
                Longitude = -46.6335,
                Descricao = "Descrição Atualizada"
            };

            _mockRepository.Setup(x => x.GetByIdAsync(collectionPointId)).ReturnsAsync(existingPoint);
            _mockRepository.Setup(x => x.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.UpdateCollectionPoint(collectionPointId, updateDto);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task UpdateCollectionPoint_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var collectionPointId = 999;
            var updateDto = new UpdateCollectionPointDto
            {
                Nome = "Ponto Atualizado",
                Endereco = "Endereço Atualizado",
                Latitude = -23.5507,
                Longitude = -46.6335,
                Descricao = "Descrição Atualizada"
            };

            _mockRepository.Setup(x => x.GetByIdAsync(collectionPointId)).ReturnsAsync((CollectionPoint?)null);

            // Act
            var result = await _controller.UpdateCollectionPoint(collectionPointId, updateDto);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task DeleteCollectionPoint_ExistingId_ReturnsNoContent()
        {
            // Arrange
            var collectionPointId = 1;
            var collectionPoint = new CollectionPoint
            {
                CollectionPointId = collectionPointId,
                Nome = "Ponto para Deletar",
                Endereco = "Endereço",
                Latitude = -23.5505,
                Longitude = -46.6333,
                Descricao = "Descrição"
            };

            _mockRepository.Setup(x => x.GetByIdAsync(collectionPointId)).ReturnsAsync(collectionPoint);
            _mockRepository.Setup(x => x.Delete(collectionPoint));
            _mockRepository.Setup(x => x.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteCollectionPoint(collectionPointId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteCollectionPoint_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var collectionPointId = 999;
            _mockRepository.Setup(x => x.GetByIdAsync(collectionPointId)).ReturnsAsync((CollectionPoint?)null);

            // Act
            var result = await _controller.DeleteCollectionPoint(collectionPointId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }
    }
}