using Sustema.Api.Models;
using System.Text.Json;

namespace Sustema.Api.Services
{
    /// <summary>
    /// Service for managing gamification records and badges.
    /// </summary>
    public class GamificationRecordService
    {
        /// <summary>
        /// List of all available badges with their minimum points required.
        /// </summary>
        public static readonly List<BadgeInfo> BadgeMasterLista = new()
            {
                new BadgeInfo { Nome = "Novato", PontosMinimos = 0 },
                new BadgeInfo { Nome = "Eco-Guerreiro", PontosMinimos = 100 },
                new BadgeInfo { Nome = "Guardião Verde", PontosMinimos = 500 },
                new BadgeInfo { Nome = "Mestre da Sustentabilidade", PontosMinimos = 1000 }
            };

        /// <summary>
        /// Updates the user's badges based on their points.
        /// </summary>
        /// <param name="record">The gamification record of the user.</param>
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
        /// Gets the list of badges the user has earned.
        /// </summary>
        /// <param name="record">The gamification record of the user.</param>
        /// <returns>A list of badge names.</returns>
        public List<string> ObterBadgesUsuario(GamificationRecord record)
        {
            if (string.IsNullOrEmpty(record.Badges))
            {
                return new List<string>();
            }

            return JsonSerializer.Deserialize<List<string>>(record.Badges);
        }

        /// <summary>
        /// Gets the list of badges the user has not yet earned.
        /// </summary>
        /// <param name="record">The gamification record of the user.</param>
        /// <returns>A list of badge names.</returns>
        public List<string> ObterBadgesNaoAdquiridas(GamificationRecord record)
        {
            var badgesConquistadas = ObterBadgesUsuario(record);
            var todasBadges = BadgeMasterLista.Select(badge => badge.Nome).ToList();

            return todasBadges.Except(badgesConquistadas).ToList();
        }
    }
}
