using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManagementApp.Application.Dtos;
using UserManagementApp.Application.Interfaces.Services;
using UserManagementApp.Application.Response;

namespace UserManagementApp.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(ProductDto dto)
        {
            var created = await _productService.CreateAsync(dto);
            if (!created)
                return BadRequest(ApiResponse<string>.Fail("El producto ya existe."));

            return Ok(ApiResponse<string>.Ok(null, "Producto creado correctamente."));
        }

        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> Update(int id, ProductDto dto)
        {
            var updated = await _productService.UpdateAsync(id, dto);
            if (!updated)
                return NotFound(ApiResponse<string>.Fail("Producto no encontrado."));

            return Ok(ApiResponse<string>.Ok(null, "Producto actualizado correctamente."));
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _productService.DeleteAsync(id);
            if (!deleted)
                return NotFound(ApiResponse<string>.Fail("Producto no encontrado."));

            return Ok(ApiResponse<string>.Ok(null, "Producto eliminado correctamente."));
        }
    }
}
