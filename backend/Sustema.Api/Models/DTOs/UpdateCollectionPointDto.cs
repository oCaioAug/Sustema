namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para atualizacao de um ponto de coleta
    /// </summary>
    public class UpdateCollectionPointDto
    {
        public string Nome { get; set; }

        public string Endereco { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string Descricao { get; set; }
    }
}
