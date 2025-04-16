using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        private readonly AppDataContext _context;

        public CategoriaController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/categorias
        [HttpGet]
        public async Task<IActionResult> GetCategorias()
        {
            var categorias = await _context.Categorias.ToListAsync();
            return Ok(categorias);
        }

        // GET: api/categorias/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoria(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
                return NotFound();

            return Ok(categoria);
        }

        // POST: api/categorias
        [HttpPost]
        public async Task<IActionResult> CreateCategoria([FromBody] Categoria categoria)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            categoria.CriadoEm = DateTime.Now;
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
        }

        // PUT: api/categorias/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoria(int id, [FromBody] Categoria updatedCategoria)
        {
            if (id != updatedCategoria.Id)
                return BadRequest("ID da categoria não confere.");

            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
                return NotFound();

            categoria.Nome = updatedCategoria.Nome;
            // Aqui pode-se atualizar outros campos se necessário

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/categorias/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
                return NotFound();

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
