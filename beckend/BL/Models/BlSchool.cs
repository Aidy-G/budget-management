using System;
using System.Collections.Generic;
using Common.Models;
namespace BL.Models;
public class BlSchool
{
    public int SchoolSymbol { get; set; }

    public string? SchoolName { get; set; }

    public decimal Budget { get; set; }
    
    public List<BlExpenditure> Expenditures { get; set; } = new List<BlExpenditure>();

   //public  List<User> Users { get; set; } = new List<User>();
    //BL
    public decimal? CurrentBudget { get; set; }

}
