using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TwinBackend.Repository.Migrations.TwinDb
{
    /// <inheritdoc />
    public partial class ModifyUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "BirthDate",
                table: "Developers",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Developers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Developers",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Developers");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Developers");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Developers");
        }
    }
}
