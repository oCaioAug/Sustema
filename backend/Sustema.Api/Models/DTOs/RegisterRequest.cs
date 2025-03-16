using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para a requisição de registro.
    /// </summary>
    public class RegisterRequest
    {
        /// <summary>
        /// Nome do usuário.
        /// </summary>
        [Required]
        public string Nome { get; set; }

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

        /// <summary>
        /// Perfil do usuário.
        /// </summary>
        [Required]
        public PerfilUsuario Perfil { get; set; }

    }
}
