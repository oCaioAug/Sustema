namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// DTO para criação da CollectionPoint - Ponto de Coleta
    /// </summary>
    public class CollectionPointCreateDto
    {
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string TipoMaterialAceito { get; set; }
    }
}
