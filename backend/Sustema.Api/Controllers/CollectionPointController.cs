using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Models;
using Sustema.Api.Repositories;

namespace Sustema.Api.Controllers
{
    /// <summary>
    /// Controlador para gerenciamento dos pontos de coleta.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionPointController : ControllerBase
    {
        private readonly IRepository<CollectionPoint> _repository;

        /// <summary>
        /// Inicializa uma nova instância do <see cref="CollectionPointController"/>.
        /// </summary>
        /// <param name="repository">Repositório para CollectionPoint.</param>
        public CollectionPointController(IRepository<CollectionPoint> repository)
        {
            _repository = repository;
        }

        // GET: api/CollectionPoint
        /// <summary>
        /// Retorna todos os pontos de coleta cadastrados.
        /// </summary>
        /// <returns>Lista de pontos de coleta.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var points = await _repository.GetAllAsync();

            return Ok(points);
        }

        // GET: api/CollectionPoint/{id}
        /// <summary>
        /// Retorna um ponto de coleta pelo seu identificador.
        /// </summary>
        /// <param name="id">Identificador do ponto de coleta.</param>
        /// <returns>Ponto de coleta ou NotFound se não existir.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var point = await _repository.GetByIdAsync(id);
            if (point == null)
            {
                return NotFound();
            }

            return Ok(point);
        }

        // POST: api/CollectionPoint
        /// <summary>
        /// Cria um novo ponto de coleta.
        /// </summary>
        /// <param name="point">Dados do ponto de coleta.</param>
        /// <returns>Ponto de coleta criado.</returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CollectionPoint point)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _repository.AddAsync(point);
            await _repository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = point.CollectionPointId }, point);
        }
    }
}
