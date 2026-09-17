using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public virtual ICollection<Expenditure> Expenditures { get; set; } = new List<Expenditure>();
}
