using UserManagementApp.Application.Dtos;
using UserManagementApp.Application.Response;
using UserManagementApp.Domain.Entities;

namespace UserManagementApp.Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<ApiResponse<string>> CreateAsync(UserDto dto);
        Task<ApiResponse<string>> UpdateAsync(int id, UserUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
