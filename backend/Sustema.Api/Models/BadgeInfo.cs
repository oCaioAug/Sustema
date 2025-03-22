namespace Sustema.Api.Models
{
    /// <summary>
    /// Represents the information of a badge.
    /// </summary>
    public class BadgeInfo
    {
        /// <summary>
        /// Gets or sets the name of the badge.
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// Gets or sets the minimum points required for the badge.
        /// </summary>
        public int PontosMinimos { get; set; }
    }
}
