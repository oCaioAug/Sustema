using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    /// <summary>
    /// Represents a collection point for recycling actions.
    /// </summary>
    public class CollectionPoint
    {
        /// <summary>
        /// Gets or sets the unique identifier for the collection point.
        /// </summary>
        [Key]
        public int CollectionPointId { get; set; }

        /// <summary>
        /// Gets or sets the name of the collection point.
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// Gets or sets the address of the collection point.
        /// </summary>
        [Required]
        public string Endereco { get; set; }

        /// <summary>
        /// Gets or sets the latitude of the collection point.
        /// </summary>
        [Required]
        public double Latitude { get; set; }

        /// <summary>
        /// Gets or sets the longitude of the collection point.
        /// </summary>
        [Required]
        public double Longitude { get; set; }

        /// <summary>
        /// Gets or sets the description of the collection point.
        /// </summary>
        [Required]
        public string Descricao { get; set; }

        /// <summary>
        /// Gets or sets the recycling actions associated with the collection point.
        /// </summary>
        public ICollection<RecyclingAction> RecyclingActions { get; set; }
    }
}
