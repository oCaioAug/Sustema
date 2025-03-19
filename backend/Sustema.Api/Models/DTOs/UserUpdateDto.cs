using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para atualização do Usuário
    /// </summary>
    public class UserUpdateDto
    {
        /// <summary>
        /// Nome do usário a ser atualizado
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// Email do usuário a ser atualizado
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
