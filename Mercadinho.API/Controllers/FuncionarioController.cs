using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/funcionarios")]
    public class FuncionarioController : ControllerBase
    {
        private readonly AppDataContext _context;

        public FuncionarioController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/funcionarios
        [HttpGet]
        public async Task<IActionResult> GetFuncionarios()
        {
            var funcionarios = await _context.Funcionarios.Include(f => f.Filial).ToListAsync();
            return Ok(funcionarios);
        }

        // GET: api/funcionarios/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFuncionario(int id)
        {
            var funcionario = await _context.Funcionarios
                                             .Include(f => f.Filial)
                                             .FirstOrDefaultAsync(f => f.Id == id);
            if (funcionario == null)
                return NotFound();

            return Ok(funcionario);
        }

        // POST: api/funcionarios
        [HttpPost]
        public async Task<IActionResult> CreateFuncionario([FromBody] Funcionario funcionario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            funcionario.CriadoEm = DateTime.Now;
            _context.Funcionarios.Add(funcionario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFuncionario), new { id = funcionario.Id }, funcionario);
        }

        // PUT: api/funcionarios/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFuncionario(int id, [FromBody] Funcionario updatedFuncionario)
        {
            if (id != updatedFuncionario.Id)
                return BadRequest("ID do funcionário não confere.");

            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario == null)
                return NotFound();

            funcionario.Nome = updatedFuncionario.Nome;
            funcionario.Salario = updatedFuncionario.Salario;
            funcionario.FilialId = updatedFuncionario.FilialId;
            // Atualize outros campos conforme necessário

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/funcionarios/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncionario(int id)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario == null)
                return NotFound();

            _context.Funcionarios.Remove(funcionario);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
