using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Teamo_API.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assignments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    DueDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Priority = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assignments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AssignmentUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AssignmentId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignmentUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Text = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    AssignmentId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                });

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
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    StartDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
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

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AssignmentUsers",
                columns: new[] { "Id", "AssignmentId", "UserId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 2 },
                    { 3, 2, 2 },
                    { 4, 2, 4 },
                    { 5, 3, 1 },
                    { 6, 3, 2 },
                    { 7, 4, 3 },
                    { 8, 4, 4 }
                });

            migrationBuilder.InsertData(
                table: "Assignments",
                columns: new[] { "Id", "Description", "DueDate", "Priority", "ProjectId", "Status", "Title" },
                values: new object[,]
                {
                    { 1, "Create an ER diagram and a relational schema for a given scenario", new DateTime(2023, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 1, 0, "Database design" },
                    { 2, "Implement a CRUD application using ASP.NET Core and Entity Framework", new DateTime(2023, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 2, 0, "Web development" },
                    { 3, "Create a simple app that uses the camera and GPS features of the device", new DateTime(2023, 11, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 3, 0, "Mobile development" },
                    { 4, "Make a game that has basic physics and collision detection", new DateTime(2023, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 4, 0, "Game development" },
                    { 5, "Write SQL queries to create tables and insert data for the database design", new DateTime(2023, 9, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 1, 0, "Database implementation" },
                    { 6, "Create a responsive and user-friendly UI for the web application using HTML, CSS and Bootstrap", new DateTime(2023, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 2, 0, "Web design" },
                    { 7, "Create a native and intuitive UI for the mobile app using Xamarin Forms", new DateTime(2023, 11, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 3, 0, "Mobile design" },
                    { 8, "Create a storyboard and a prototype for the game using Unity tools", new DateTime(2023, 12, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 4, 0, "Game design" }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "AssignmentId", "CreatedAt", "Text", "UserId" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2023, 9, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "This assignment is very challenging", 1 },
                    { 2, 1, new DateTime(2023, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "I agree, we need to work hard on this", 2 },
                    { 3, 2, new DateTime(2023, 9, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), "This assignment is very fun", 3 },
                    { 4, 2, new DateTime(2023, 9, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), "I agree, we can learn a lot from this", 4 },
                    { 5, 3, new DateTime(2023, 11, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "This assignment is very interesting", 1 },
                    { 6, 3, new DateTime(2023, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "I agree, we can use some cool features of the device", 2 },
                    { 7, 4, new DateTime(2023, 12, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "This assignment is very creative", 3 },
                    { 8, 4, new DateTime(2023, 12, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "I agree, we can make a fun game with Unity", 4 }
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
                table: "Projects",
                columns: new[] { "Id", "Description", "EndDate", "Name", "StartDate" },
                values: new object[,]
                {
                    { 1, "A project to design and implement a database system", new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Database project", new DateTime(2023, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "A project to develop a web application using ASP.NET Core and Entity Framework", new DateTime(2023, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Web project", new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "A project to create a mobile app using Xamarin and Azure", new DateTime(2023, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mobile project", new DateTime(2023, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "A project to make a simple game using Unity and C#", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Game project", new DateTime(2023, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
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

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password" },
                values: new object[,]
                {
                    { 1, "erenvbn@gmail.com", "Eren", "ereneren" },
                    { 2, "emrevbn@gmail.com", "Emre", "emreemre" },
                    { 3, "bengüvbn@gmail.com", "Bengü", "bengübengü" },
                    { 4, "mehmetvbn@gmail.com", "Mehmet", "mehmetmehmet" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assignments");

            migrationBuilder.DropTable(
                name: "AssignmentUsers");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
