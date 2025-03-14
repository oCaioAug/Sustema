using System.ComponentModel.DataAnnotations;

namespace Sustema.Api.Models
{
    public enum ContentType
    {
        Texto,
        Imagem,
        Video,
        Audio,
        Artigo,
        Infografico
    }

    public class EducationalContent
    {
        [Key]
        public int ContentId { get; set; }

        [Required]
        public string Titulo { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        public ContentType Tipo { get; set; } 

        public string URL { get; set; }

        [Required]
        public DateTime DataPublicacao { get; set; }
    }
}
