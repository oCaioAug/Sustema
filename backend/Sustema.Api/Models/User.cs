using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    /// <summary>
    /// Enum representing the user profile types.
    /// </summary>
    public enum PerfilUsuario
    {
        /// <summary>
        /// Citizen profile.
        /// </summary>
        Cidadao,

        /// <summary>
        /// Company profile.
        /// </summary>
        Empresa,

        /// <summary>
        /// Admin profile.
        /// </summary>
        Admin
    }

    /// <summary>
    /// Represents a user in the system.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Gets or sets the user ID.
        /// </summary>
        [Key]
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets the user's name.
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// Gets or sets the user's email.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the user's password hash.
        /// </summary>
        [Required]
        public string PasswordHash { get; set; }

        /// <summary>
        /// Gets or sets the user's profile type.
        /// </summary>
        [Required]
        public PerfilUsuario Perfil { get; set; }

        /// <summary>
        /// Gets or sets the date the user was registered.
        /// </summary>
        [Required]
        public DateTime DataCadastro { get; set; }

        /// <summary>
        /// Gets or sets the collection of recycling actions associated with the user.
        /// </summary>
        public ICollection<RecyclingAction> RecyclingActions { get; set; }

        /// <summary>
        /// Gets or sets the collection of gamification records associated with the user.
        /// </summary>
        public ICollection<GamificationRecord> GamificationRecords { get; set; }
    }
}
