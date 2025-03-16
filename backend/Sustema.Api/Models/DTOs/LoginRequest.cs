using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para a requisição de login.
    /// </summary>
    public class LoginRequest
    {
        /// <summary>
        /// Email do usuário.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Senha do usuário.
        /// </summary>
        [Required]
        public string Password { get; set; }
    }
}
