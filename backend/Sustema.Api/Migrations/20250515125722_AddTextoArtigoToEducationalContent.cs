using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sustema.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddTextoArtigoToEducationalContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TextoArtigo",
                table: "EducationalContents",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TextoArtigo",
                table: "EducationalContents");
        }
    }
}
