namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// Data Transfer Object for Recycling Action.
    /// </summary>
    public class RecyclingActionDto
    {
        /// <summary>
        /// Gets or sets the User ID.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets the Collection Point ID.
        /// </summary>
        public int CollectionPointId { get; set; }

        /// <summary>
        /// Gets or sets the date of the recycling action.
        /// </summary>
        public DateTime Data { get; set; }

        /// <summary>
        /// Gets or sets the type of material.
        /// </summary>
        public string TipoMaterial { get; set; }

        /// <summary>
        /// Gets or sets the quantity of material.
        /// </summary>
        public decimal Quantidade { get; set; }

        /// <summary>
        /// Gets or sets the unit of measurement.
        /// </summary>
        public string UnidadeMedida { get; set; }
    }
}
