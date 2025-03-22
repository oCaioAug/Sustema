using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    /// <summary>
    /// Represents a recycling action performed by a user.
    /// </summary>
    public class RecyclingAction
    {
        /// <summary>
        /// Gets or sets the unique identifier for the recycling action.
        /// </summary>
        [Key]
        public int RecyclingActionId { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier for the user who performed the recycling action.
        /// </summary>
        [Required]
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier for the collection point where the recycling action took place.
        /// </summary>
        [Required]
        public int CollectionPointId { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the recycling action was performed.
        /// </summary>
        [Required]
        public DateTime Data { get; set; }

        /// <summary>
        /// Gets or sets the type of material recycled.
        /// </summary>
        [Required]
        public string TipoMaterial { get; set; }

        /// <summary>
        /// Gets or sets the quantity of material recycled.
        /// </summary>
        [Required]
        public decimal Quantidade { get; set; }

        /// <summary>
        /// Gets or sets the unit of measurement for the quantity of material recycled.
        /// </summary>
        [Required]
        public string UnidadeMedida { get; set; }

        /// <summary>
        /// Gets or sets the user who performed the recycling action.
        /// </summary>
        [ForeignKey("UserId")]
        public User User { get; set; }

        /// <summary>
        /// Gets or sets the collection point where the recycling action took place.
        /// </summary>
        [ForeignKey("CollectionPointId")]
        public CollectionPoint CollectionPoint { get; set; }
    }
}
