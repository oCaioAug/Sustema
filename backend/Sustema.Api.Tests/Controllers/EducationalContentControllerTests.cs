using Microsoft.AspNetCore.Mvc;
using Moq;
using Sustema.Api.Controllers;
using Sustema.Api.Models;
using Sustema.Api.Repositories;
using Xunit;

namespace Sustema.Api.Tests.Controllers
{
    public class EducationalContentControllerTests
    {
        private readonly Mock<IRepository<EducationalContent>> _mockRepository;
        private readonly EducationalContentController _controller;

        public EducationalContentControllerTests()
        {
            _mockRepository = new Mock<IRepository<EducationalContent>>();
            _controller = new EducationalContentController(_mockRepository.Object);
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
            var educationalContents = new List<EducationalContent>
            {
                new EducationalContent
                {
                    ContentId = 1,
                    Titulo = "Conteúdo 1",
                    Descricao = "Descrição 1",
                    Tipo = ContentType.Video,
                    URL = "https://example.com/video1",
                    DataPublicacao = DateTime.Now
                },
                new EducationalContent
                {
                    ContentId = 2,
                    Titulo = "Conteúdo 2",
                    Descricao = "Descrição 2",
                    Tipo = ContentType.Artigo,
                    TextoArtigo = "Texto do artigo",
                    DataPublicacao = DateTime.Now
                }
            };

            _mockRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(educationalContents);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(educationalContents, okResult.Value);
        }

        [Fact]
        public async Task GetById_ExistingId_ReturnsOkResult()
        {
            // Arrange
            var contentId = 1;
            var educationalContent = new EducationalContent
            {
                ContentId = contentId,
                Titulo = "Conteúdo Teste",
                Descricao = "Descrição Teste",
                Tipo = ContentType.Video,
                URL = "https://example.com/video",
                DataPublicacao = DateTime.Now
            };

            _mockRepository.Setup(x => x.GetByIdAsync(contentId)).ReturnsAsync(educationalContent);

            // Act
            var result = await _controller.GetById(contentId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(educationalContent, okResult.Value);
        }

        [Fact]
        public async Task GetById_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var contentId = 999;
            _mockRepository.Setup(x => x.GetByIdAsync(contentId)).ReturnsAsync((EducationalContent?)null);

            // Act
            var result = await _controller.GetById(contentId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task Create_ValidVideoContent_ReturnsCreatedResult()
        {
            // Arrange
            var educationalContent = new EducationalContent
            {
                Titulo = "Novo Vídeo",
                Descricao = "Descrição do novo vídeo",
                Tipo = ContentType.Video,
                URL = "https://example.com/newvideo",
                DataPublicacao = DateTime.Now
            };

            _mockRepository.Setup(x => x.AddAsync(It.IsAny<EducationalContent>())).Returns(Task.CompletedTask);
            _mockRepository.Setup(x => x.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Create(educationalContent);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(educationalContent, createdResult.Value);
        }

        [Fact]
        public async Task Create_ValidArticleContent_ReturnsCreatedResult()
        {
            // Arrange
            var educationalContent = new EducationalContent
            {
                Titulo = "Novo Artigo",
                Descricao = "Descrição do novo artigo",
                Tipo = ContentType.Artigo,
                TextoArtigo = "Conteúdo completo do artigo aqui...",
                DataPublicacao = DateTime.Now
            };

            _mockRepository.Setup(x => x.AddAsync(It.IsAny<EducationalContent>())).Returns(Task.CompletedTask);
            _mockRepository.Setup(x => x.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Create(educationalContent);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(educationalContent, createdResult.Value);
        }

        [Fact]
        public async Task Create_ArticleWithoutText_ReturnsBadRequest()
        {
            // Arrange
            var educationalContent = new EducationalContent
            {
                Titulo = "Artigo Sem Texto",
                Descricao = "Descrição",
                Tipo = ContentType.Artigo,
                TextoArtigo = "", // Texto vazio
                DataPublicacao = DateTime.Now
            };

            // Act
            var result = await _controller.Create(educationalContent);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task Update_ExistingContent_ReturnsNoContent()
        {
            // Arrange
            var contentId = 1;
            var existingContent = new EducationalContent
            {
                ContentId = contentId,
                Titulo = "Título Original",
                Descricao = "Descrição Original",
                Tipo = ContentType.Video,
                URL = "https://example.com/original",
                DataPublicacao = DateTime.Now.AddDays(-1)
            };

            var updatedContent = new EducationalContent
            {
                ContentId = contentId,
                Titulo = "Título Atualizado",
                Descricao = "Descrição Atualizada",
                Tipo = ContentType.Video,
                URL = "https://example.com/updated",
                DataPublicacao = DateTime.Now
            };

            _mockRepository.Setup(x => x.GetByIdAsync(contentId)).ReturnsAsync(existingContent);
            _mockRepository.Setup(x => x.Update(It.IsAny<EducationalContent>()));
            _mockRepository.Setup(x => x.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Update(contentId, updatedContent);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Update_NonExistingContent_ReturnsNotFound()
        {
            // Arrange
            var contentId = 999;
            var updatedContent = new EducationalContent
            {
                ContentId = contentId,
                Titulo = "Título Atualizado",
                Descricao = "Descrição Atualizada",
                Tipo = ContentType.Video,
                URL = "https://example.com/updated",
                DataPublicacao = DateTime.Now
            };

            _mockRepository.Setup(x => x.GetByIdAsync(contentId)).ReturnsAsync((EducationalContent?)null);

            // Act
            var result = await _controller.Update(contentId, updatedContent);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task Delete_ExistingContent_ReturnsNoContent()
        {
            // Arrange
            var contentId = 1;
            var educationalContent = new EducationalContent
            {
                ContentId = contentId,
                Titulo = "Conteúdo para Deletar",
                Descricao = "Descrição",
                Tipo = ContentType.Video,
                URL = "https://example.com/video",
                DataPublicacao = DateTime.Now
            };

            _mockRepository.Setup(x => x.GetByIdAsync(contentId)).ReturnsAsync(educationalContent);
            _mockRepository.Setup(x => x.Delete(educationalContent));
            _mockRepository.Setup(x => x.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Delete(contentId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Delete_NonExistingContent_ReturnsNotFound()
        {
            // Arrange
            var contentId = 999;
            _mockRepository.Setup(x => x.GetByIdAsync(contentId)).ReturnsAsync((EducationalContent?)null);

            // Act
            var result = await _controller.Delete(contentId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetTipoConteudo_ReturnsOkWithEnumValues()
        {
            // Act
            var result = _controller.GetTipoConteudo();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var tipos = Assert.IsType<string[]>(okResult.Value);
            Assert.Contains("Video", tipos);
            Assert.Contains("Artigo", tipos);
            Assert.Contains("Texto", tipos);
            Assert.Contains("Imagem", tipos);
        }
    }
}