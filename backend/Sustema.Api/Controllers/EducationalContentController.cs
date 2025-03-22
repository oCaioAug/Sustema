using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Models;
using Sustema.Api.Repositories;

namespace Sustema.Api.Controllers
{
    /// <summary>
    /// Controlador para gerenciamento de conteúdos educativos.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class EducationalContentController : ControllerBase
    {
        private readonly IRepository<EducationalContent> _repository;

        /// <summary>
        /// Inicializa uma nova instância do <see cref="EducationalContentController"/>.
        /// </summary>
        /// <param name="repository">Repositório para EducationalContent.</param>
        public EducationalContentController(IRepository<EducationalContent> repository)
        {
            _repository = repository;
        }

        // GET: api/EducationalContent
        /// <summary>
        /// Retorna todos os conteúdos educativos.
        /// </summary>
        /// <returns>Lista de conteúdos educativos.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<EducationalContent>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var contents = await _repository.GetAllAsync();

            return Ok(contents);
        }

        // GET: api/EducationalContent/{id}
        /// <summary>
        /// Retorna um conteúdo educativo pelo seu identificador.
        /// </summary>
        /// <param name="id">Identificador do conteúdo.</param>
        /// <returns>Conteúdo educativo ou NotFound.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(EducationalContent), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var content = await _repository.GetByIdAsync(id);
            if (content == null)
            {
                return NotFound(new { message = "Conteúdo educacional não encontrado!"});
            }

            return Ok(new { data = content});
        }

        // POST: api/EducationalContent
        /// <summary>
        /// Cria um novo conteúdo educativo.
        /// </summary>
        /// <param name="content">Dados do conteúdo educativo.</param>
        /// <returns>Conteúdo criado.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(EducationalContent), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
        /// <summary>
        /// Atualiza um conteúdo educativo existente.
        /// </summary>
        /// <param name="id">Identificador do conteúdo a ser atualizado.</param>
        /// <param name="updatedContent">Dados atualizados do conteúdo.</param>
        /// <returns>Status NoContent se atualizado com sucesso.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(int id, [FromBody] EducationalContent updatedContent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var content = await _repository.GetByIdAsync(id);
            if (content == null)
            {
                return NotFound(new { message = "Conteúdo educacional não encontrado!", id });
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
        /// <summary>
        /// Exclui um conteúdo educativo.
        /// </summary>
        /// <param name="id">Identificador do conteúdo a ser excluído.</param>
        /// <returns>Status NoContent se excluído com sucesso.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            var content = await _repository.GetByIdAsync(id);
            if (content == null)
            {
                return NotFound(new { message = "Conteúdo não encontrado!", id});
            }
            _repository.Delete(content);
            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}
