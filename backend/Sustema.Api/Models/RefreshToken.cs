namespace Sustema.Api.Models
{
    /// <summary>
    /// Refresh Token
    /// </summary>
    public class RefreshToken
    {
        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// Data e hora de expiração
        /// </summary>
        public DateTime Expiration { get; set; }
    }
}
