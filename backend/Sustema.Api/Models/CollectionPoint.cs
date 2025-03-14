using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    public class CollectionPoint
    {
        [Key]
        public int CollectionPointId { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Endereco { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public string Descricao { get; set; }
    }
}
