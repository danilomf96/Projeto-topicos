using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/produtos")]
    public class ProdutoController : ControllerBase
    {
        private readonly AppDataContext _context;

        public ProdutoController(AppDataContext context)
        {
            _context = context;
        }

        // GET: api/produtos
        [HttpGet]
        public async Task<IActionResult> GetProdutos()
        {
            var produtos = await _context.Produtos.Include(p => p.Categoria).ToListAsync();
            return Ok(produtos);
        }

        // GET: api/produtos/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduto(int id)
        {
            var produto = await _context.Produtos
                                        .Include(p => p.Categoria)
                                        .FirstOrDefaultAsync(p => p.Id == id);
            if (produto == null)
                return NotFound();

            return Ok(produto);
        }

        // POST: api/produtos
        [HttpPost]
        public async Task<IActionResult> CreateProduto([FromBody] Produto produto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            produto.CriadoEm = DateTime.Now;
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
        }

        // PUT: api/produtos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduto(int id, [FromBody] Produto updatedProduto)
        {
            if (id != updatedProduto.Id)
                return BadRequest("ID do produto não confere.");

            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
                return NotFound();

            produto.Nome = updatedProduto.Nome;
            produto.Tipo = updatedProduto.Tipo;
            produto.Preco = updatedProduto.Preco;
            produto.Quantidade = updatedProduto.Quantidade;
            produto.CategoriaId = updatedProduto.CategoriaId;
            // Atualize outros campos conforme necessário

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/produtos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
                return NotFound();

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
