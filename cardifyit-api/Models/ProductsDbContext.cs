using Microsoft.EntityFrameworkCore;

namespace cardifyit_api.Models
{
    public class ProductsDbContext : DbContext
    {
        public ProductsDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Product> Products { get; set; } = null!;
    }
}