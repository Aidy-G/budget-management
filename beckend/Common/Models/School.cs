using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class School
{
    public int SchoolSymbol { get; set; }

    public string SchoolName { get; set; } = null!;

    public decimal Budget { get; set; }

    public virtual ICollection<Expenditure> Expenditures { get; set; } = new List<Expenditure>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
