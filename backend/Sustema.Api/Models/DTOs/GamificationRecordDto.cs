namespace Sustema.Api.Models.DTOs
{
    public class GamificationRecordDto
    {
        public int GamificationRecordId { get; set; } // Corrigido para refletir a chave primária correta
        public int UserId { get; set; }
        public int Pontos { get; set; }
        public string Badges { get; set; } // Adicionado para armazenar distintivos do usuário
        public DateTime DataRegistro { get; set; }
    }
}
