using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Models;
using Sustema.Api.Repositories;

namespace Sustema.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecyclingActionController : ControllerBase
    {
        private readonly IRepository<RecyclingAction> _repository;

        public RecyclingActionController(IRepository<RecyclingAction> repository)
        {
            _repository = repository;
        }

        // POST: api/RecyclingAction
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RecyclingAction action)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            action.Data = DateTime.UtcNow;
            await _repository.AddAsync(action);
            await _repository.SaveChangesAsync();

            return Ok(new {message = "Ação de reciclagem registrada com sucesso!"});
        }

        // GET: api/RecyclingAction
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var actions = await _repository.GetAllAsync();

            return Ok(actions);
        }
    }
}
