using Microsoft.EntityFrameworkCore;
using UserManagementApp.Domain.Entities;
using UserManagementApp.Application.Interfaces.Repositories;
using UserManagementApp.Infrastructure.Data;

namespace UserManagementApp.Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Username == username);
        }
    }
}
