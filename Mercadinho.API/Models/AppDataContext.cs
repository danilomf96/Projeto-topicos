using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class AppDataContext : DbContext
{
    // DbSets
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Filial> Filials { get; set; }
    public DbSet<Funcionario> Funcionarios { get; set; }

    // Construtor necessário para a injeção de dependência
    public AppDataContext(DbContextOptions<AppDataContext> options)
        : base(options)
    {
    }

    // Se preferir manter a configuração via OnConfiguring, veja a dica abaixo:
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Só configure se as opções ainda não tiverem sido definidas, assim não sobrescreve a configuração do DI.
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlite("Data Source=Ecommerce.db");
        }
    }
}
