using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Models;
using Sustema.Api.Repositories;

namespace Sustema.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionPointController : ControllerBase
    {
        private readonly IRepository<CollectionPoint> _repository;

        public CollectionPointController(IRepository<CollectionPoint> repository)
        {
            _repository = repository;
        }

        // GET: api/CollectionPoint
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var points = await _repository.GetAllAsync();

            return Ok(points);
        }

        // GET: api/CollectionPoint/{id}
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
