namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para CollectionPoint - Ponto de Coleta
    /// </summary>
    public class CollectionPointDto
    {
        /// <summary>
        /// Gets or sets the unique identifier for the collection point.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name of the collection point.
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Gets or sets the address of the collection point.
        /// </summary>
        public string Endereco { get; set; }

        /// <summary>
        /// Gets or sets the type of material accepted at the collection point.
        /// </summary>
        public string TipoMaterialAceito { get; set; }
    }
}
