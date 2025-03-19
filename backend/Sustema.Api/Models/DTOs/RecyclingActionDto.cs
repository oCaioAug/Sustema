namespace Sustema.Api.Models.DTOs
{
    public class RecyclingActionDto
    {
        public int UserId { get; set; }
        public int CollectionPointId { get; set; }
        public DateTime Data { get; set; }
        public string TipoMaterial { get; set; }
        public decimal Quantidade { get; set; }
        public string UnidadeMedida { get; set; }
    }
}
