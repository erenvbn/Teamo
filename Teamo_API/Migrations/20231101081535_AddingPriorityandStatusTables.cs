using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Teamo_API.Migrations
{
    /// <inheritdoc />
    public partial class AddingPriorityandStatusTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentUsers_Assignments_AssignmentId",
                table: "AssignmentUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentUsers_Users_UserId",
                table: "AssignmentUsers");

            migrationBuilder.DropIndex(
                name: "IX_AssignmentUsers_AssignmentId",
                table: "AssignmentUsers");

            migrationBuilder.DropIndex(
                name: "IX_AssignmentUsers_UserId",
                table: "AssignmentUsers");

            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PriorityTitle = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StatusTitle = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "Id", "PriorityTitle" },
                values: new object[,]
                {
                    { 1, "Unknown" },
                    { 2, "Low Priority" },
                    { 3, "Neutral" },
                    { 4, "High Priority" },
                    { 5, "Critical" }
                });

            migrationBuilder.InsertData(
                table: "Statuses",
                columns: new[] { "Id", "StatusTitle" },
                values: new object[,]
                {
                    { 1, "Pending" },
                    { 2, "In Process" },
                    { 3, "Completed" },
                    { 4, "Canceled" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentUsers_AssignmentId",
                table: "AssignmentUsers",
                column: "AssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentUsers_UserId",
                table: "AssignmentUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentUsers_Assignments_AssignmentId",
                table: "AssignmentUsers",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentUsers_Users_UserId",
                table: "AssignmentUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
