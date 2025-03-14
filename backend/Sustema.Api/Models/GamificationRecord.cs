using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    public class GamificationRecord
    {
        [Key]
        public int GamificationRecordId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int Pontos { get; set; }

        // Os badges podem ser armazenados como string (JSON, CSV, etc.) ou em uma tabela separada
        public string Badges { get; set; }

        [Required]
        public DateTime DataRegistro { get; set; }

        // Relacionamento
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
