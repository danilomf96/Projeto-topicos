using Mercadinho.API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

//Implementar a henraça da classe DbContext
public class AppDataContext : DbContext
{
    //Declarar todas as classes de modelo que vão virar tabelas no banco de dados
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Filial> Filials { get; set; }
    public DbSet<Funcionario> Funcionarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Ecommerce.db");
    }
}