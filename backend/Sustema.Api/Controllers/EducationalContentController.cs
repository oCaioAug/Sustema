using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Models;
using Sustema.Api.Repositories;

namespace Sustema.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationalContentController : ControllerBase
    {
        private readonly IRepository<EducationalContent> _repository;

        public EducationalContentController(IRepository<EducationalContent> repository)
        {
            _repository = repository;
        }

        // GET: api/EducationalContent
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var contents = await _repository.GetAllAsync();

            return Ok(contents);
        }

        // GET: api/EducationalContent/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var content = await _repository.GetByIdAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            return Ok(content);
        }

        // POST: api/EducationalContent
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EducationalContent content)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _repository.AddAsync(content);
            await _repository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = content.ContentId }, content);
        }

        // PUT: api/EducationalContent/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EducationalContent updatedContent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var content = await _repository.GetByIdAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            content.Titulo = updatedContent.Titulo;
            content.Descricao = updatedContent.Descricao;
            content.Tipo = updatedContent.Tipo;
            content.URL = updatedContent.URL;
            content.DataPublicacao = updatedContent.DataPublicacao;

            _repository.Update(content);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/EducationalContent/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var content = await _repository.GetByIdAsync(id);
            if (content == null)
            {
                return NotFound();
            }
            _repository.Delete(content);
            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}
