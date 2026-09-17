using System;
using System.Collections.Generic;

namespace BL.Models;
public class BlSupplier
{
    public string SupplierName { get; set; } = null!;

    public int LicensedNum { get; set; }

    public int BankCode { get; set; }

    public int NumOfBankBranch { get; set; }

    public int NumOfBankAccount { get; set; }

    public string NameOfOwnerAccount { get; set; } = null!;
    public List<BlExpenditure> Expenditures { get; set; } = new List<BlExpenditure>();
    //BL

    //סכום כולל לספק מסוים
    public decimal PaymentForSupllier { get; set; }

    //להוסיף סכום חוב לספק????
    public decimal DebtForSupllier { get; set; }

    
}
