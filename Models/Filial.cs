using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Filial
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O proprietário é obrigatório.")]
        public string Proprietario { get; set; } = string.Empty;

        [Required(ErrorMessage = "O local é obrigatório.")]
        public string Local { get; set; } = string.Empty;

        public decimal Lucro { get; set; }
        public decimal Despesas { get; set; }
        public DateTime CriadoEm { get; set; } = DateTime.Now;
    }
}
