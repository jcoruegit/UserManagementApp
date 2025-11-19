using System.ComponentModel.DataAnnotations;
using UserManagementApp.Domain.Enums;

namespace UserManagementApp.Application.Dtos
{
    public class UserUpdateDto
    {
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public string Role { get; set; } = string.Empty;
        
    }
}
