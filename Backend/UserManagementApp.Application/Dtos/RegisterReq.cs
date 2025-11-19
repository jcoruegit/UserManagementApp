using System.ComponentModel.DataAnnotations;

namespace UserManagementApp.Backend.Dtos
{
    public class RegisterReq
    {
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")] 
        public string Password { get; set; } = string.Empty;
    }
}
