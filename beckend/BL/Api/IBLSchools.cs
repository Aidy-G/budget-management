//using Dal.Models;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace BL.Api
{
    public interface IBLSchools
    {
        Task<List<BlSchool>> GetSchools();
        Task<BlSchool> GetSchoolBySymbol(int symbol);
        Task<BlSchool>? GetSchoolBySName(string n);
        Task<List<BlExpenditure>>? GetExpendituresOfSchool(int s);
        BlSchool CastingToBl(School s);
        List<BlSchool> CastingToBl(List<School> list);
        Task<bool> Create(School newS);
        Task<decimal> SetCurrBudget(int SchoolS);

       Task<decimal> GetSumOfEpendituresOfSchool(int schoolSymbol);
        decimal GetDebtOfSchool(params string[] names);
        Task<School> UpdateSchool(School school, int schoolS);

        void RemoveSchool(int sSymbol);



    }
}
