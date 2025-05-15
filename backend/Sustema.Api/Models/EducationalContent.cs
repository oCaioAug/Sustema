using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Sustema.Api.Models
{
    /// <summary>
    /// Represents the type of educational content.
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))] // Permite conversão de strings para enum
    public enum ContentType
    {
        /// <summary>
        /// Text content.
        /// </summary>
        Texto,
        /// <summary>
        /// Image content.
        /// </summary>
        Imagem,
        /// <summary>
        /// Video content.
        /// </summary>
        Video,
        /// <summary>
        /// Audio content.
        /// </summary>
        Audio,
        /// <summary>
        /// Article content.
        /// </summary>
        Artigo,
        /// <summary>
        /// Infographic content.
        /// </summary>
        Infografico
    }

    /// <summary>
    /// Represents an educational content item.
    /// </summary>
    public class EducationalContent
    {
        /// <summary>
        /// Gets or sets the content ID.
        /// </summary>
        [Key]
        public int ContentId { get; set; }

        /// <summary>
        /// Gets or sets the title of the content.
        /// </summary>
        [Required]
        public string Titulo { get; set; }

        /// <summary>
        /// Gets or sets the description of the content.
        /// </summary>
        [Required]
        public string Descricao { get; set; }

        /// <summary>
        /// Gets or sets the type of the content.
        /// </summary>
        [Required]
        public ContentType Tipo { get; set; }

        /// <summary>
        /// Gets or sets the URL of the content.
        /// </summary>
        public string URL { get; set; }

        /// <summary>
        /// Gets or sets the publication date of the content.
        /// </summary>
        [Required]
        public DateTime DataPublicacao { get; set; }

        /// <summary>
        /// Gets or sets the article text for article content type.
        /// </summary>
        public string TextoArtigo { get; set; } // Novo campo para artigos
    }
}
