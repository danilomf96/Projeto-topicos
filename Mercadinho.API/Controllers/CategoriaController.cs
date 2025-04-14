using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

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
    public IActionResult ListAll()
    {
        var categorias = _context.Categorias.ToList();
        return Ok(categorias);
    }

    [HttpGet("{id}")]
    public IActionResult FindById(int id)
    {
        var categoria = _context.Categorias.Find(id);
        if (categoria == null)
        {
            return NotFound();
        }

        return Ok(categoria);
    }
}
