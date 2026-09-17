using BL.Models;
//using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace BL.Api
{
    public interface IBLExpenditures
    {

        Task<List<BlExpenditure>> GetExpenditures();

        Task<BlExpenditure> GetExpenditureById(int id);

        decimal GetPaimentBySupllierId(int sId);

        decimal GetUsingBudget(int SchoolSymbol);
        Task<decimal> GetSumOfCategory(int categoryId);

        List<BlExpenditure> CastingToBl(List<Expenditure> list);

        BlExpenditure CastingToBl(Expenditure e);
        Task<bool> UpdatePayment(Dictionary<int, decimal> dicPayment);


        Task<Expenditure> UpdateExpenditure(BlExpenditure Expenditure, int id);
        Task<bool> Create(BlExpenditure expenditure);
        bool RemoveExpenditures(int ls);


    }
}
