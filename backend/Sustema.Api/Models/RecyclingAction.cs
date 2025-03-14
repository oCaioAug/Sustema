using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    public class RecyclingAction
    {
        [Key]
        public int RecyclingActionId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CollectionPointId { get; set; }

        [Required]
        public DateTime Data { get; set; }

        [Required]
        public string TipoMaterial { get; set; }

        [Required]
        public decimal Quantidade { get; set; }

        [Required]
        public string UnidadeMedida { get; set; }

        // Relacionamentos
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("CollectionPointId")]
        public CollectionPoint CollectionPoint { get; set; }
    }
}
