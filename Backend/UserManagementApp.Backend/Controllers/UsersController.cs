using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManagementApp.Application.Dtos;
using UserManagementApp.Application.Interfaces;
using UserManagementApp.Application.Response;

namespace UserManagementApp.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "AdminOnly")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("GetAll")]       
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(UserDto dto)
        {
            var result = await _userService.CreateAsync(dto);
            if (!result.Success)                
                return BadRequest(ApiResponse<string>.Fail(result.Message));
           
            return Ok(ApiResponse<string>.Ok(null, result.Message));
        }

        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> Update(int id, UserUpdateDto dto)
        {
            var result = await _userService.UpdateAsync(id, dto);
             if (!result.Success)
                return BadRequest(ApiResponse<string>.Fail(result.Message));

            return Ok(ApiResponse<string>.Ok(null, result.Message));
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _userService.DeleteAsync(id);
            if (!deleted)                
                return NotFound(ApiResponse<string>.Fail("Usuario no encontrado."));
            
            return Ok(ApiResponse<string>.Ok(null, "Usuario eliminado correctamente."));
        }
    }
}
