using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dal.Migrations
{
    /// <inheritdoc />
    public partial class AddExpenditureSnapshotNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    categoryId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    categoryName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.categoryId);
                });

            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    schoolSymbol = table.Column<int>(type: "INTEGER", nullable: false),
                    schoolName = table.Column<string>(type: "TEXT", nullable: false),
                    budget = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.schoolSymbol);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    LicensedNum = table.Column<int>(type: "INTEGER", nullable: false),
                    supplierName = table.Column<string>(type: "TEXT", nullable: false),
                    bankCode = table.Column<int>(type: "INTEGER", nullable: false),
                    numOfBankBranch = table.Column<int>(type: "INTEGER", nullable: false),
                    numOfBankAccount = table.Column<int>(type: "INTEGER", nullable: false),
                    nameOfOwnerAccount = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.LicensedNum);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false),
                    userName = table.Column<string>(type: "TEXT", nullable: false),
                    schoolSymbol = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_users_Schools_schoolSymbol",
                        column: x => x.schoolSymbol,
                        principalTable: "Schools",
                        principalColumn: "schoolSymbol",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Expenditures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    schoolSymbol = table.Column<int>(type: "INTEGER", nullable: false),
                    expenditureSum = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false),
                    categoryId = table.Column<int>(type: "INTEGER", nullable: false),
                    CategoryName = table.Column<string>(type: "TEXT", nullable: true),
                    supplierNum = table.Column<int>(type: "INTEGER", nullable: false),
                    SupplierName = table.Column<string>(type: "TEXT", nullable: true),
                    date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ordererName = table.Column<string>(type: "TEXT", nullable: false),
                    invoiceNum = table.Column<int>(type: "INTEGER", nullable: false),
                    isAccepted = table.Column<bool>(type: "INTEGER", nullable: false),
                    amountPaid = table.Column<decimal>(type: "DECIMAL(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenditures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expenditures_Categories_categoryId",
                        column: x => x.categoryId,
                        principalTable: "Categories",
                        principalColumn: "categoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Expenditures_Schools_schoolSymbol",
                        column: x => x.schoolSymbol,
                        principalTable: "Schools",
                        principalColumn: "schoolSymbol",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Expenditures_Suppliers_supplierNum",
                        column: x => x.supplierNum,
                        principalTable: "Suppliers",
                        principalColumn: "LicensedNum",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenditures_categoryId",
                table: "Expenditures",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenditures_schoolSymbol",
                table: "Expenditures",
                column: "schoolSymbol");

            migrationBuilder.CreateIndex(
                name: "IX_Expenditures_supplierNum",
                table: "Expenditures",
                column: "supplierNum");

            migrationBuilder.CreateIndex(
                name: "IX_users_schoolSymbol",
                table: "users",
                column: "schoolSymbol");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expenditures");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Schools");
        }
    }
}
