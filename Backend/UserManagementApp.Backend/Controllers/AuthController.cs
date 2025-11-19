using Microsoft.AspNetCore.Mvc;
using UserManagementApp.Application.Response;
using UserManagementApp.Application.Services;
using UserManagementApp.Backend.Dtos;
using UserManagementApp.Domain.Entities;
using UserManagementApp.Domain.Enums;

namespace UserManagementApp.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest(ApiResponse<string>.Fail("El nombre de usuario y la contraseña son obligatorios."));
                }

                var tokenString = await _authService.AuthenticateAsync(request.Username, request.Password);

                if (tokenString == null)
                {
                    return Unauthorized(ApiResponse<string>.Fail("Usuario o contraseña incorrectos."));
                }

                return Ok(ApiResponse<string>.Ok(tokenString, "Login exitoso"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<string>.Fail("Error interno del servidor: " + ex.Message));
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterReq request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
                return BadRequest(ApiResponse<string>.Fail("El nombre de usuario y la contraseña son obligatorios."));
                

            var username = request.Username.Trim().ToLowerInvariant();
            var exists = await _authService.UserExistsAsync(username);

            if (exists)
                return Conflict(ApiResponse<string>.Fail("El nombre de usuario ya existe."));                

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                Username = request.Username.Trim(),
                PasswordHash = passwordHash,
                Role = UserRole.User
            };

            try
            {
                await _authService.AddUser(user);
                return Ok(ApiResponse<string>.Ok(null, "Usuario registrado correctamente."));
               
            }
            catch (Exception ex)
            {
               return StatusCode(StatusCodes.Status500InternalServerError, ApiResponse<string>.Fail("Hubo un error interno: " + ex.Message));
            }
        }
    }
}
