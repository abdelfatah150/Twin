using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TwinBackend.Repository.Migrations.TwinDb
{
    /// <inheritdoc />
    public partial class AddEmailAttributeToDeveloper : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Developers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Developers");
        }
    }
}
