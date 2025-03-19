using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para requisição so Usuário
    /// </summary>
    public class UserDto
    {
        /// <summary>
        /// Id do usuário
        /// </summary>
        [Required]
        public int Id { get; set; }
        /// <summary>
        /// Nome do usuário
        /// </summary>
        [Required]
        public string Nome { get; set; }
        /// <summary>
        /// Email do usuário
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        /// <summary>
        /// Perfil do usuário
        /// </summary>
        [Required]
        public PerfilUsuario Perfil { get; set; }

        /// <summary>
        /// Data de cadastro
        /// </summary>
        [Required]
        public DateTime DataCadastro { get; set; }

        public ICollection<RecyclingActionDto> RecyclingActions { get; set; }
        public ICollection<GamificationRecordDto> GamificationRecords { get; set; } 
    }
}
