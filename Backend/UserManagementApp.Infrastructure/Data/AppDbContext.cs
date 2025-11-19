using Microsoft.EntityFrameworkCore;
using UserManagementApp.Domain.Entities;
using UserManagementApp.Domain.Enums;

namespace UserManagementApp.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

       
        public DbSet<User> Users => Set<User>();
        public DbSet<Product> Products => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            // Usuario de prueba inicial
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    PasswordHash = "$2a$11$nkH.TRzPzCOZya7nU/dm0uqJjm1FMOZbw32L93inBjYd.4kGBAtdq",
                    Role = UserRole.Admin
                }
            );

            modelBuilder.Entity<User>()
               .HasIndex(u => u.Username)
               .IsUnique();
        }
    }
}
