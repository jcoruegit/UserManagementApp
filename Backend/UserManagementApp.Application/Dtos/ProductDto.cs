using System.ComponentModel.DataAnnotations;

namespace UserManagementApp.Application.Dtos
{
    public class ProductDto
    {
        [Required(ErrorMessage ="El campo {0} es obligatorio")]
        public string Nombre { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public string Descripcion { get; set; } = string.Empty;

        [Range(1, 99999999.99, ErrorMessage = "El valor debe estar entre 1 y 99999999.99")]
        public decimal Precio { get; set; }

        [Range(1, 99999999, ErrorMessage = "El valor debe estar entre 1 y 99999999")]
        public int Stock { get; set; }       
    }
}
