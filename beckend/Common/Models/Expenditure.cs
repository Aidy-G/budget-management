using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class Expenditure
{
    public int Id { get; set; }

    public int SchoolSymbol { get; set; }

    public decimal ExpenditureSum { get; set; }

    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public int SupplierNum { get; set; }

    public string? SupplierName { get; set; }

    public DateTime Date { get; set; }

    public string OrdererName { get; set; } = null!;

    public int InvoiceNum { get; set; }

    public bool IsAccepted { get; set; }

    public decimal AmountPaid { get; set; }

    public virtual Category? Category { get; set; } = null!;

    public virtual School? SchoolSymbolNavigation { get; set; } = null!;

    public virtual Supplier? SupplierNumNavigation { get; set; } = null!;
}
