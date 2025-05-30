using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using Sustema.Api.Controllers;
using Sustema.Api.Interfaces.Services;
using Sustema.Api.Models;
using Sustema.Api.Models.DTOs;
using Sustema.Api.Repositories;
using Sustema.Api.Services;
using Xunit;

namespace Sustema.Api.Tests.Controllers
{
    public class UserControllerTests
    {
        private readonly Mock<IUserRepository> _mockUserRepository;
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly Mock<IUserService> _mockUserService;
        private readonly UserController _controller;

        public UserControllerTests()
        {
            _mockUserRepository = new Mock<IUserRepository>();
            _mockConfiguration = new Mock<IConfiguration>();
            _mockUserService = new Mock<IUserService>();
            _controller = new UserController(_mockUserRepository.Object, _mockConfiguration.Object, _mockUserService.Object);
        }

        [Fact]
        public async Task GetUser_ExistingId_ReturnsOkResult()
        {
            // Arrange
            var userId = 1;
            var userDto = new UserDto { Id = userId, Email = "test@test.com", Nome = "Test User" };
            _mockUserService.Setup(x => x.GetUserByIdAsync(userId)).ReturnsAsync(userDto);

            // Act
            var result = await _controller.GetUser(userId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task GetUser_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var userId = 999;
            _mockUserService.Setup(x => x.GetUserByIdAsync(userId)).ReturnsAsync((UserDto?)null);

            // Act
            var result = await _controller.GetUser(userId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public async Task GetAllUsers_ReturnsOkResult()
        {
            // Arrange
            var users = new List<UserDto>
            {
                new UserDto { Id = 1, Email = "user1@test.com", Nome = "User 1" },
                new UserDto { Id = 2, Email = "user2@test.com", Nome = "User 2" }
            };
            _mockUserService.Setup(x => x.GetAllUsersAsync()).ReturnsAsync(users);

            // Act
            var result = await _controller.GetAllUsers();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(users, okResult.Value);
        }

        [Fact]
        public async Task Register_ValidRequest_ReturnsCreatedResult()
        {
            // Arrange
            var registerRequest = new RegisterRequest
            {
                Nome = "New User",
                Email = "newuser@test.com",
                Password = "Password123",
                Perfil = PerfilUsuario.Cidadao
            };

            var userDto = new UserDto { Id = 1, Email = registerRequest.Email, Nome = registerRequest.Nome };
            var serviceResult = (RegisterUserResult.Success, userDto);

            _mockUserService.Setup(x => x.RegisterUserAsync(registerRequest)).ReturnsAsync(serviceResult);

            // Act
            var result = await _controller.Register(registerRequest);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(userDto, createdResult.Value);
        }

        [Fact]
        public async Task Register_EmailAlreadyExists_ReturnsConflict()
        {
            // Arrange
            var registerRequest = new RegisterRequest
            {
                Nome = "Existing User",
                Email = "existing@test.com",
                Password = "Password123",
                Perfil = PerfilUsuario.Cidadao
            };

            var serviceResult = (RegisterUserResult.EmailAlreadyExists, (UserDto?)null);

            _mockUserService.Setup(x => x.RegisterUserAsync(registerRequest)).ReturnsAsync(serviceResult);

            // Act
            var result = await _controller.Register(registerRequest);

            // Assert
            Assert.IsType<ConflictObjectResult>(result);
        }

        [Fact]
        public async Task DeleteUser_ExistingId_ReturnsOk()
        {
            // Arrange
            var userId = 1;
            _mockUserService.Setup(x => x.DeleteUserAsync(userId)).ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteUser(userId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task DeleteUser_NonExistingId_ReturnsNotFound()
        {
            // Arrange
            var userId = 999;
            _mockUserService.Setup(x => x.DeleteUserAsync(userId)).ReturnsAsync(false);

            // Act
            var result = await _controller.DeleteUser(userId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        [Fact]
        public void GetPerfilUsuarios_ReturnsOkWithEnumValues()
        {
            // Act
            var result = _controller.GetPerfilUsuarios();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var perfis = Assert.IsType<string[]>(okResult.Value);
            Assert.Contains("Cidadao", perfis);
            Assert.Contains("Empresa", perfis);
            Assert.Contains("Admin", perfis);
        }
    }
}