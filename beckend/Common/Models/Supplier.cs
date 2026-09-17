using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class Supplier
{
    public string SupplierName { get; set; } = null!;

    public int LicensedNum { get; set; }

    public int BankCode { get; set; }

    public int NumOfBankBranch { get; set; }

    public int NumOfBankAccount { get; set; }

    public string NameOfOwnerAccount { get; set; } = null!;

    public virtual ICollection<Expenditure> Expenditures { get; set; } =  new List<Expenditure>();
}
