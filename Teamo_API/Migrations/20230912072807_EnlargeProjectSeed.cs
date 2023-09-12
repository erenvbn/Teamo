using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable


namespace Teamo_API.Migrations
{
    /// <inheritdoc />
    public partial class EnlargeProjectSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Description", "EndDate", "Name", "StartDate" },
                values: new object[,]
                {
                    { 3, "A project to create a mobile app using Xamarin and Azure", new DateTime(2023, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mobile project", new DateTime(2023, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "A project to make a simple game using Unity and C#", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Game project", new DateTime(2023, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
