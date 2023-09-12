using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable


namespace Teamo_API.Migrations
{
    /// <inheritdoc />
    public partial class EnlargeCommentSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 2,
                column: "AuthorId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 3,
                column: "AuthorId",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 4,
                column: "AuthorId",
                value: 4);

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "AssignmentId", "AuthorId", "CreatedAt", "Text" },
                values: new object[,]
                {
                    { 5, 3, 1, new DateTime(2023, 11, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "This assignment is very interesting" },
                    { 6, 3, 2, new DateTime(2023, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "I agree, we can use some cool features of the device" },
                    { 7, 4, 3, new DateTime(2023, 12, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "This assignment is very creative" },
                    { 8, 4, 4, new DateTime(2023, 12, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "I agree, we can make a fun game with Unity" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 2,
                column: "AuthorId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 3,
                column: "AuthorId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 4,
                column: "AuthorId",
                value: 2);
        }
    }
}
