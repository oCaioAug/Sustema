using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    /// <summary>
    /// Represents a record of gamification points and badges for a user.
    /// </summary>
    public class GamificationRecord
    {
        /// <summary>
        /// Gets or sets the unique identifier for the gamification record.
        /// </summary>
        [Key]
        public int GamificationRecordId { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier for the user associated with this record.
        /// </summary>
        [Required]
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets the points earned by the user.
        /// </summary>
        [Required]
        public int Pontos { get; set; }

        /// <summary>
        /// Gets or sets the badges earned by the user, stored as a string.
        /// </summary>
        public string Badges { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the record was created.
        /// </summary>
        [Required]
        public DateTime DataRegistro { get; set; }

        /// <summary>
        /// Gets or sets the user associated with this record.
        /// </summary>
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
