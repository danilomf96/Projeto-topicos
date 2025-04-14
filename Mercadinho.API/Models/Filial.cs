namespace Mercadinho.API.Models;

public class Filial
{
    public int Id { get; set; }
    public string Proprietario { get; set; } = string.Empty;
    public string Local { get; set; } = string.Empty;
    public decimal Lucro { get; set; }
    public decimal Despesas { get; set; }
         public DateTime CriadoEm { get; set; } = DateTime.Now;
}