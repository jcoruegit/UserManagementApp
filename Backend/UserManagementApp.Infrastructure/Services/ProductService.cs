using UserManagementApp.Application.Dtos;
using UserManagementApp.Domain.Entities;
using UserManagementApp.Application.Interfaces.Repositories;
using UserManagementApp.Application.Interfaces.Services;

namespace UserManagementApp.Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            var products = await _repository.GetAllAsync();
            return products.Select(p => new Product
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                Stock = p.Stock                
            });
        }

        public async Task<Product?> GetByIdAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return null;

            return new Product
            {
                Id = product.Id,
                Nombre = product.Nombre,
                Descripcion = product.Descripcion,
                Precio = product.Precio,
                Stock = product.Stock
            };
        }
        public async Task<bool> CreateAsync(ProductDto producto)
        {
            var product = new Product
            {
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock               
            };
            await _repository.AddAsync(product);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(int id, ProductDto producto)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return false;

            product.Nombre = producto.Nombre;
            product.Descripcion = producto.Descripcion;
            product.Precio = producto.Precio;
            product.Stock = producto.Stock;            

            _repository.Update(product);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _repository.GetByIdAsync(id);
            if (product == null) return false;

            _repository.Remove(product);
            await _repository.SaveChangesAsync();
            return true;
        }


    }
}
