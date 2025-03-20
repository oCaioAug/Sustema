using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Data;
using Sustema.Api.Models;
using Sustema.Api.Repositories;

namespace Sustema.Api.Controllers
{
    /// <summary>
    /// Controlador para registro e consulta de ações de reciclagem.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RecyclingActionController : ControllerBase
    {
        private readonly IRepository<RecyclingAction> _repository;
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Inicializa uma nova instância do <see cref="RecyclingActionController"/>.
        /// </summary>
        /// <param name="repository">Repositório para RecyclingAction.</param>
        /// <param name="context">Contexto do banco de dados.</param>
        public RecyclingActionController(IRepository<RecyclingAction> repository, ApplicationDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        // POST: api/RecyclingAction
        /// <summary>
        /// Registra uma nova ação de reciclagem.
        /// </summary>
        /// <param name="action">Dados da ação de reciclagem.</param>
        /// <returns>Mensagem de sucesso.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] RecyclingAction action)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            action.Data = DateTime.UtcNow;
            //await _repository.AddAsync(action);
            await _context.AddAsync(action);
            await _repository.SaveChangesAsync();

            return Ok(new {message = "Ação de reciclagem registrada com sucesso!"});
        }

        // GET: api/RecyclingAction
        /// <summary>
        /// Retorna todas as ações de reciclagem registradas.
        /// </summary>
        /// <returns>Lista de ações de reciclagem.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var actions = await _repository.GetAllAsync();

            return Ok(actions);
        }

        /// <summary>
        /// Retorna uma ação de reciclagem pelo seu identificador.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetById(int id)
        {
            var action = await _repository.GetByIdAsync(id);
            if (action == null)
            {
                return NotFound();
            }

            return Ok(action);
        }

        /// <summary>
        /// Atualiza uma ação de reciclagem pelo seu identificador.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPut("update/{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Update(int id, [FromBody] RecyclingAction action)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var actionToUpdate = await _repository.GetByIdAsync(id);

            if (actionToUpdate == null)
            {
                return NotFound();
            }

            actionToUpdate.Data = action.Data;
            actionToUpdate.CollectionPointId = action.CollectionPointId;
            actionToUpdate.UserId = action.UserId;
            actionToUpdate.Data = action.Data;
            actionToUpdate.Quantidade = action.Quantidade;
            actionToUpdate.TipoMaterial = action.TipoMaterial;
            actionToUpdate.UnidadeMedida = action.UnidadeMedida;

            _context.Update(actionToUpdate);
            await _repository.SaveChangesAsync();

            return Ok(new { message = "Ação de reciclagem atualizada com sucesso!" });
        }

        /// <summary>
        /// Remove uma ação de reciclagem pelo seu identificador.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete(int id)
        {
            var action = await _repository.GetByIdAsync(id);
            if (action == null)
            {
                return NotFound();
            }
            _context.Remove(action);
            await _repository.SaveChangesAsync();

            return Ok(new { message = "Ação de reciclagem removida com sucesso!" });
        }

    }
}
