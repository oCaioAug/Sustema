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
        public async Task<IActionResult> GetAll()
        {
            var actions = await _repository.GetAllAsync();

            return Ok(actions);
        }
    }
}
