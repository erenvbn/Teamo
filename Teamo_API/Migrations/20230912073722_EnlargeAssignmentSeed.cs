using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable


namespace Teamo_API.Migrations
{
    /// <inheritdoc />
    public partial class EnlargeAssignmentSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Assignments",
                columns: new[] { "Id", "Description", "DueDate", "Priority", "ProjectId", "Status", "Title" },
                values: new object[,]
                {
                    { 3, "Create a simple app that uses the camera and GPS features of the device", new DateTime(2023, 11, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 3, 0, "Mobile development" },
                    { 4, "Make a game that has basic physics and collision detection", new DateTime(2023, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, 4, 0, "Game development" },
                    { 5, "Write SQL queries to create tables and insert data for the database design", new DateTime(2023, 9, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 1, 0, "Database implementation" },
                    { 6, "Create a responsive and user-friendly UI for the web application using HTML, CSS and Bootstrap", new DateTime(2023, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 2, 0, "Web design" },
                    { 7, "Create a native and intuitive UI for the mobile app using Xamarin Forms", new DateTime(2023, 11, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 3, 0, "Mobile design" },
                    { 8, "Create a storyboard and a prototype for the game using Unity tools", new DateTime(2023, 12, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, 4, 0, "Game design" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Assignments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Assignments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Assignments",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Assignments",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Assignments",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Assignments",
                keyColumn: "Id",
                keyValue: 8);
        }
    }
}
