using Sustema.Api.Models;
using System.Text.Json;

namespace Sustema.Api.Services
{
    public class GamificationRecordService
    {
        public static readonly List<BadgeInfo> BadgeMasterLista = new List<BadgeInfo>
        {
            new BadgeInfo { Nome = "Novato", PontosMinimos = 0 },
            new BadgeInfo { Nome = "Eco-Guerreiro", PontosMinimos = 100 },
            new BadgeInfo { Nome = "Guardião Verde", PontosMinimos = 500 },
            new BadgeInfo { Nome = "Mestre da Sustentabilidade", PontosMinimos = 1000 }
        };

        /// <summary>
        /// Atualiza as badges do usuário
        /// </summary>
        /// <param name="record"></param>
        public void AtualizarBadges(GamificationRecord record)
        { 
            int pontosUsuario = record.Pontos;

            var badgesConquistadas = BadgeMasterLista
                .Where(badge => pontosUsuario >= badge.PontosMinimos)
                .Select(badge => badge.Nome)
                .ToList();

            record.Badges = JsonSerializer.Serialize(badgesConquistadas);
        }

        /// <summary>
        /// Obtém a lista de badges do usuário
        /// </summary>
        /// <param name="record"></param>
        /// <returns></returns>
        public List<string> ObterBadgesUsuario(GamificationRecord record)
        {
            if (string.IsNullOrEmpty(record.Badges))
            {
                return new List<string>();
            }

            return JsonSerializer.Deserialize<List<string>>(record.Badges);
        }

        /// <summary>
        /// Obtém a lista de badges não adquiridas pelo usuário
        /// </summary>
        /// <param name="record"></param>
        /// <returns></returns>
        public List<string> ObterBadgesNaoAdquiridas(GamificationRecord record)
        {
            var badgesConquistadas = ObterBadgesUsuario(record);
            var todasBadges = BadgeMasterLista.Select(badge => badge.Nome).ToList();

            return todasBadges.Except(badgesConquistadas).ToList();
        }
    }
}
