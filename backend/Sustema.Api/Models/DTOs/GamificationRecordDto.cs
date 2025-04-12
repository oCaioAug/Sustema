namespace Sustema.Api.Models.DTOs
{
    /// <summary>
    /// Data Transfer Object for Gamification Record.
    /// </summary>
    public class GamificationRecordDto
    {
        /// <summary>
        /// Gets or sets the Gamification Record ID.
        /// </summary>
        public int GamificationRecordId { get; set; } 

        /// <summary>
        /// Gets or sets the User ID.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or sets the points.
        /// </summary>
        public int Pontos { get; set; }

        /// <summary>
        /// Gets or sets the badges.
        /// </summary>
        public string Badges { get; set; }

        /// <summary>
        /// Gets or sets the registration date.
        /// </summary>
        public DateTime DataRegistro { get; set; }
    }
}
