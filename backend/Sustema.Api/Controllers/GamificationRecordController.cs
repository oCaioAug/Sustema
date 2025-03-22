using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Models;
using Sustema.Api.Repositories;
using Sustema.Api.Services;

namespace Sustema.Api.Controllers
{
    /// <summary>
    /// Controlador para gerenciar os registros de gamificação.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class GamificationRecordController : ControllerBase
    {
        private readonly IRepository<GamificationRecord> _repository;
        private readonly GamificationRecordService _gamificationService;

        /// <summary>
        /// Inicializa uma nova instância do <see cref="GamificationRecordController"/>.
        /// </summary>
        /// <param name="repository">Repositório para GamificationRecord.</param>
        /// <param name="gamificationService">Serviço para manipulação de badges e pontos.</param>
        public GamificationRecordController(IRepository<GamificationRecord> repository, GamificationRecordService gamificationService)
        {
            _repository = repository;
            _gamificationService = gamificationService;
        }

        //GET: api/GamificationRecord/user/{userId}
        /// <summary>
        /// Retorna os registros de gamificação de um usuário
        /// </summary>
        /// <param name="userId">Id do usuário.</param>
        /// <returns>Lista de registro de gamificação</returns>
        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(IEnumerable<GamificationRecord>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var record = (await _repository.GetAllAsync()).Where(record => record.UserId == userId);

            return Ok(new { message = "Dados encontrados!", data = record});
        }

        //POST: api/GamificationRecord/update/{recordId}
        // Atualiza os pontos e recalcula os badges com base na nova pontuação
        /// <summary>
        /// Atualiza um registro de gamificação, adicionando pontos e recalculando os badges.
        /// </summary>
        /// <param name="recordId">Identificador do registro de gamificação.</param>
        /// <param name="pontosAdicionados">Quantidade de pontos a serem adicionados.</param>
        /// <returns>Registro atualizado e mensagem de sucesso.</returns>
        [HttpPut("{recordId}")]
        [ProducesResponseType(typeof(GamificationRecord), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateRecord(int recordId, [FromBody] int pontosAdicionados)
        { 
            var record = await _repository.GetByIdAsync(recordId);
            if (record == null)
            {
                return NotFound(new { message = "Registro de gamificação não encontrado", recordId});
            }

            //Atualiza a pontuação
            record.Pontos += pontosAdicionados;
            record.DataRegistro = DateTime.UtcNow;

            //Recalcula os badges
            _gamificationService.AtualizarBadges(record);

            _repository.Update(record);
            await _repository.SaveChangesAsync();

            return Ok(new { message = "Registro atualizado!", data = record});
        }

        // GET: api/GamificationRecord/availableBadges/{recordId}
        // Retorna as badges já conquistadas e as que ainda não foram adquiridas, baseado no registro
        /// <summary>
        /// Retorna as badges conquistadas e as que ainda não foram adquiridas para um registro de gamificação.
        /// </summary>
        /// <param name="recordId">Identificador do registro de gamificaçãoIdentificador do registro de gamificação.</param>
        /// <returns>Objeto contendo as listas de badges conquistadas e não adquiridas.</returns>
        [HttpGet("availableBadges/{recordId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAvailableBadges(int recordId)
        { 
            var record = await _repository.GetByIdAsync(recordId);
            if (record == null)
            {
                return NotFound(new { message = "Não foram encontradas badges disponíveis!"});
            }

            var badgesConquistadas = _gamificationService.ObterBadgesUsuario(record);
            var badgesNaoAdquiridas = _gamificationService.ObterBadgesNaoAdquiridas(record);

            return Ok(new { badgesConquistadas = badgesConquistadas, badgesNaoAdquiridas = badgesNaoAdquiridas });
        }

        /// <summary>
        /// Registra um novo registro de gamificação.
        /// </summary>
        /// <param name="record"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(GamificationRecord), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] GamificationRecord record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            record.DataRegistro = DateTime.UtcNow;
            
            await _repository.AddAsync(record);
            await _repository.SaveChangesAsync();

            return Ok(new { message = "Registro de gamificação criado com sucesso!", data = record });
        }

        /// <summary>
        /// Retorna todos os registros de gamificação.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(GamificationRecord), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var record = await _repository.GetByIdAsync(id);
            if (record == null)
            {
                return NotFound(new { message = "Registro de gamificação não encontrado!", id});
            }

            return Ok(record);
        }

        /// <summary>
        /// Apaga um registro de gamificação.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var record = await _repository.GetByIdAsync(id);
            if (record == null)
            {
                return NotFound(new { message = "Registro de gamificação não encontradado"});
            }
            _repository.Delete(record);
            await _repository.SaveChangesAsync();

            return Ok(new { message = "Registro de gamificação excluído com sucesso!" });
        }
    }
}
