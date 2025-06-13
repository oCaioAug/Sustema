using Microsoft.AspNetCore.Authorization;
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

            // Retorna todos os campos do conteúdo educacional
            return Ok(content);
        }

        // POST: api/EducationalContent
        /// <summary>
        /// Cria um novo conteúdo educativo.
        /// </summary>
        /// <param name="content">Dados do conteúdo educativo.</param>
        /// <returns>Conteúdo criado.</returns>
        [Authorize]
        [HttpPost]
        [ProducesResponseType(typeof(EducationalContent), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] EducationalContent content)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Garante que a URL e TextoArtigo sejam preenchidos corretamente
            if (content.Tipo == ContentType.Video)
            {
                content.TextoArtigo = null;
                content.URL = content.URL ?? content.Titulo; // fallback se vier vazio
            }
            else if (content.Tipo == ContentType.Artigo)
            {
                content.URL = null; // Artigo não tem URL
                // Garante que TextoArtigo está preenchido
                if (string.IsNullOrWhiteSpace(content.TextoArtigo))
                {
                    return BadRequest(new { message = "O texto do artigo é obrigatório para conteúdos do tipo Artigo." });
                }
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
        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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

            // LOG DETALHADO PARA DEPURAÇÃO
            Console.WriteLine($"[DEBUG] TextoArtigo recebido: {updatedContent.TextoArtigo}");
            Console.WriteLine($"[DEBUG] TextoArtigo antes do update: {content.TextoArtigo}");

            content.Titulo = updatedContent.Titulo;
            content.Descricao = updatedContent.Descricao;
            content.Tipo = updatedContent.Tipo;
            content.DataPublicacao = updatedContent.DataPublicacao;

            if (updatedContent.Tipo == ContentType.Video)
            {
                content.URL = updatedContent.URL;
                content.TextoArtigo = string.Empty;
            }
            else if (updatedContent.Tipo == ContentType.Artigo)
            {
                content.TextoArtigo = updatedContent.TextoArtigo ?? string.Empty;
                content.URL = string.Empty;
                // Força o EF a marcar o campo como modificado
                var dbContext = (Sustema.Api.Data.ApplicationDbContext)typeof(Repository<EducationalContent>)
                    .GetField("_context", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
                    .GetValue(_repository);
                dbContext.Entry(content).Property(x => x.TextoArtigo).IsModified = true;
            }
            else
            {
                content.URL = updatedContent.URL;
                content.TextoArtigo = updatedContent.TextoArtigo ?? string.Empty;
            }

            Console.WriteLine($"[DEBUG] TextoArtigo depois do update: {content.TextoArtigo}");

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
        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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

        /// <summary>
        /// Retorna os possíveis tipos de Conteúdo.
        /// </summary>
        /// <returns>Lista de tipos de Conteúdo.</returns>
        [HttpGet("tipos")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        public IActionResult GetTipoConteudo()
        {
            var perfis = Enum.GetNames(typeof(ContentType));
            return Ok(perfis);
        }

    }
}
