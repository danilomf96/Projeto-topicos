using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/filiais")]
    public class FilialController : ControllerBase
    {
        private readonly AppDataContext _context;

        public FilialController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/filiais
        [HttpGet]
        public async Task<IActionResult> GetFiliais()
        {
            var filiais = await _context.Filials.ToListAsync();
            return Ok(filiais);
        }

        // GET: api/filiais/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFilial(int id)
        {
            var filial = await _context.Filials.FindAsync(id);
            if (filial == null)
                return NotFound();

            return Ok(filial);
        }

        // POST: api/filiais
        [HttpPost]
        public async Task<IActionResult> CreateFilial([FromBody] Filial filial)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            filial.CriadoEm = DateTime.Now;
            _context.Filials.Add(filial);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFilial), new { id = filial.Id }, filial);
        }

        // PUT: api/filiais/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFilial(int id, [FromBody] Filial updatedFilial)
        {
            if (id != updatedFilial.Id)
                return BadRequest("ID da filial não confere.");

            var filial = await _context.Filials.FindAsync(id);
            if (filial == null)
                return NotFound();

            filial.Proprietario = updatedFilial.Proprietario;
            filial.Local = updatedFilial.Local;
            filial.Lucro = updatedFilial.Lucro;
            filial.Despesas = updatedFilial.Despesas;
            // Atualize outros campos conforme necessário

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/filiais/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilial(int id)
        {
            var filial = await _context.Filials.FindAsync(id);
            if (filial == null)
                return NotFound();

            _context.Filials.Remove(filial);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
