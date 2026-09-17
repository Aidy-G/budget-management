using System;
using System.Collections.Generic;

namespace Common.Models;

public partial class User
{
    public long Id { get; set; } = -1;

    public string UserName { get; set; } = null!;

    public int SchoolSymbol { get; set; } = -1;
    public virtual School? SchoolSymbolNavigation { get; set; } = null!;

}
