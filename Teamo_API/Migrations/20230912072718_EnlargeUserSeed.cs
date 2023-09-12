using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable


namespace Teamo_API.Migrations
{
    /// <inheritdoc />
    public partial class EnlargeUserSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password" },
                values: new object[,]
                {
                    { 3, "bengüvbn@gmail.com", "Bengü", "bengübengü" },
                    { 4, "mehmetvbn@gmail.com", "Mehmet", "mehmetmehmet" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
