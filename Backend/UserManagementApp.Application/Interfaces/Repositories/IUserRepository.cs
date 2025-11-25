using UserManagementApp.Domain.Entities;

namespace UserManagementApp.Application.Interfaces.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByUsernameAsync(string username);
    }
}
