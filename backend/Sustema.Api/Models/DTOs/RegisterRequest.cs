using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models.DTOs
{
    public class RegisterRequest
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public PerfilUsuario Perfil { get; set; }

    }
}
