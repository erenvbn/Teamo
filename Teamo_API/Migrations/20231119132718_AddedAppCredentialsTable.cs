using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Teamo_API.Migrations
{
    /// <inheritdoc />
    public partial class AddedAppCredentialsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppCredentials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppName = table.Column<string>(type: "TEXT", nullable: false),
                    AppDescription = table.Column<string>(type: "TEXT", nullable: false),
                    AppContactMail = table.Column<string>(type: "TEXT", nullable: false),
                    AppContactPhone = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppCredentials", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AppCredentials",
                columns: new[] { "Id", "AppContactMail", "AppContactPhone", "AppDescription", "AppName" },
                values: new object[] { 1, "teamo@teamo.com", "000022228888", "A Team Management App", "TeamO" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppCredentials");
        }
    }
}
