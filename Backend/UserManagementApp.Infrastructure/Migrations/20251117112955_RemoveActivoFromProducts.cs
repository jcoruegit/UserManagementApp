using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserManagementApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveActivoFromProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Activo",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Activo",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
