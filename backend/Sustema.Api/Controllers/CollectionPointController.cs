﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sustema.Api.Models;
using Sustema.Api.Models.DTOs;
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

        /// <summary>
        /// Atualiza os dados de um Ponto de Coleta
        /// </summary>
        /// <param name="id"></param>
        /// <param name="collectionPointDto"></param>
        /// <returns></returns>
        [HttpPut("update/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateCollectionPoint(int id, [FromBody] UpdateCollectionPointDto collectionPointDto)
        {
            if (ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var collectionPoint = await _repository.GetByIdAsync(id);

            if (collectionPoint == null)
            {
                return NotFound(new { message = "Ponto de coleta não encontrado.", collectionPointDto });
            }

            collectionPoint.Nome = collectionPointDto.Nome;
            collectionPoint.Endereco = collectionPointDto.Endereco;
            collectionPoint.Descricao = collectionPointDto.Descricao;
            collectionPoint.Latitude = collectionPointDto.Latitude;
            collectionPoint.Longitude = collectionPointDto.Longitude;

            await _repository.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Deleta um Ponto de Coleta
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Retorna `NoContent` se o Ponto de Coleta foi apagado</returns>
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCollectionPoint(int id)
        {
            var collectionPoint = await _repository.GetByIdAsync(id);
            if (collectionPoint == null)
            {
                return NotFound(new { message = "Ponto de coleta não encontrado." });
            }
            _repository.Delete(collectionPoint);
            await _repository.SaveChangesAsync();

            return NoContent();
        }
    }
}
