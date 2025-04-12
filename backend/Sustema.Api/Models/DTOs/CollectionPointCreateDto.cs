namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para criação da CollectionPoint - Ponto de Coleta
    /// </summary>
    public class CollectionPointCreateDto
    {
        /// <summary>
        /// Nome do ponto de coleta
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Endereço do ponto de coleta
        /// </summary>
        public string Endereco { get; set; }

        /// <summary>
        /// Latitude do ponto de coleta
        /// </summary>
        public string Latitude { get; set; }

        /// <summary>
        /// Longitude do ponto de coleta
        /// </summary>
        public string Longitude { get; set; }

        /// <summary>
        /// Tipo de material aceito no ponto de coleta
        /// </summary>
        public string TipoMaterialAceito { get; set; }
    }
}
