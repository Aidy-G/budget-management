using System;
using System.Collections.Generic;

namespace BL.Models;

public class BlExpenditure
{
    public int Id { get; set; }
    public int SchoolSymbol { get; set; }
    public decimal ExpenditureSum { get; set; }

    public int CategoryId { get; set; }

    public string? CategoryName { get; set; }

    // public int SupplierNum { get; set; }

    public int? SupplierId { get; set; }

    public string? SupplierName { get; set; }

    public DateTime Date { get; set; }

    public string OrdererName { get; set; } = null!;

    public int InvoiceNum { get; set; }

    public bool IsAccepted { get; set; }
    public decimal AmountPaid { get; set; }
    //BL
    //סכום חוב שנשאר
    public decimal RemainToPay { get; set; }

    
}
