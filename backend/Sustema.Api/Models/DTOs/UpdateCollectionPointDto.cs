namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para atualizacao de um ponto de coleta
    /// </summary>
    public class UpdateCollectionPointDto
    {
        /// <summary>
        /// Nome do ponto de coleta
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Endereco do ponto de coleta
        /// </summary>
        public string Endereco { get; set; }

        /// <summary>
        /// Latitude do ponto de coleta
        /// </summary>
        public double Latitude { get; set; }

        /// <summary>
        /// Longitude do ponto de coleta
        /// </summary>
        public double Longitude { get; set; }

        /// <summary>
        /// Descricao do ponto de coleta
        /// </summary>
        public string Descricao { get; set; }
    }
}
