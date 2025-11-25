using Microsoft.EntityFrameworkCore;
using UserManagementApp.Application.Dtos;
using UserManagementApp.Application.Response;
using UserManagementApp.Domain.Entities;
using UserManagementApp.Domain.Enums;
using UserManagementApp.Application.Interfaces.Repositories;
using UserManagementApp.Infrastructure.Data;
using UserManagementApp.Application.Interfaces.Services;

namespace UserManagementApp.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;

        public UserService(IGenericRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();

            return users.Select(u => new User
            {
                Id = u.Id,
                Username = u.Username,
                Role = u.Role
            });
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            return new User
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role
            };
        }

        public async Task<ApiResponse<string>> CreateAsync(UserDto dto)
        {
            if (!Enum.TryParse<UserRole>(dto.Role.ToString(), true, out var parsedRole))
                return ApiResponse<string>.Fail("Rol inválido. Roles permitidos: Admin, User.");

            var existingUsers = await _userRepository.FindAsync(u => u.Username == dto.Username);
            if (existingUsers.Any())
                return ApiResponse<string>.Fail("El usuario ya existe.");

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = parsedRole
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return ApiResponse<string>.Ok(null, "Usuario creado correctamente.");
        }

        public async Task<ApiResponse<string>> UpdateAsync(int id, UserUpdateDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return ApiResponse<string>.Fail("Usuario no encontrado.");

            if (!Enum.TryParse<UserRole>(dto.Role.ToString(), true, out var parsedRole))
                return ApiResponse<string>.Fail("Rol inválido. Roles permitidos: Admin, User.");

            user.Username = dto.Username;
            user.Role = parsedRole;

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();
            return ApiResponse<string>.Ok(null, "Usuario modificado correctamente.");
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            _userRepository.Remove(user);
            await _userRepository.SaveChangesAsync();
            return true;
        }
    }
}
