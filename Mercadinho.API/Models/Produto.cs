using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Produto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do produto é obrigatório.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O tipo do produto é obrigatório.")]
        public string Tipo { get; set; } = string.Empty;

        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public int CategoriaId { get; set; }
        public Categoria? Categoria { get; set; }
        public DateTime CriadoEm { get; set; } = DateTime.Now;
    }
}
