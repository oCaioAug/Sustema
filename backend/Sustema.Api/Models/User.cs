using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    public enum PerfilUsuario
    {
        Cidadao,
        Empresa,
        Admin
    }

    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public PerfilUsuario Perfil { get; set; }

        [Required]
        public DateTime DataCadastro { get; set; }

        public ICollection<RecyclingAction> RecyclingActions { get; set; }
        public ICollection<GamificationRecord> GamificationRecords { get; set; }
    }
}
