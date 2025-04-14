using API.Models;

namespace Mercadinho.API.Models;

public class Produto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public int Quantidade { get; set; }
    public Categoria? Categoria { get; set; }
    public int CategoriaId { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}