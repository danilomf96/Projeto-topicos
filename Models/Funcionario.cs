using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Funcionario
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do funcionário é obrigatório.")]
        public string Nome { get; set; } = string.Empty;

        public decimal Salario { get; set; }
        public int FilialId { get; set; }
        public Filial? Filial { get; set; }
        public DateTime CriadoEm { get; set; } = DateTime.Now;
    }
}
