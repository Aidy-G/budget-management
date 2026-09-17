//using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace Dal.Api
{
    public interface IDalExpenditures
    {
        Task<List<Expenditure>> GetExpenditures();

        Task<Expenditure> UpdateExpenditure(Expenditure expenditure, int id);
        Task<bool> Create(Expenditure expenditure);
        void RemoveExpenditure(int id);




    }
}
