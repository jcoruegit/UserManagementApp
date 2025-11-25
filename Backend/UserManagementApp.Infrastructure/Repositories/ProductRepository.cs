
using UserManagementApp.Domain.Entities;
using UserManagementApp.Application.Interfaces.Repositories;
using UserManagementApp.Infrastructure.Data;

namespace UserManagementApp.Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }
    }
}
