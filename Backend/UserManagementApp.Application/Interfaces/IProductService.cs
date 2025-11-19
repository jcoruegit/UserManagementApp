using UserManagementApp.Application.Dtos;
using UserManagementApp.Domain.Entities;

namespace UserManagementApp.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task<bool> CreateAsync(ProductDto producto);
        Task<bool> UpdateAsync(int id, ProductDto producto);
        Task<bool> DeleteAsync(int id);
    }
}
