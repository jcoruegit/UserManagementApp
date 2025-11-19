using UserManagementApp.Domain.Entities;

namespace UserManagementApp.Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByUsernameAsync(string username);
    }
}
