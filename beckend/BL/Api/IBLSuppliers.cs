
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
    public interface IBLSuppliers

    {
        Task<List<BlSupplier>> GetSuppliers();
       // Task<List<BlSupplier>>? GetSuppliersForSchool(int schoolS);
        Task<BlSupplier>? GetSupplierByLicensedNum(int licensedNum);
        Task<BlSupplier> CastingToBl(Supplier s);
        Task<List<BlSupplier>> CastingToBl(List<Supplier> l);
        Task<Supplier> UpdateSupllier(Supplier s, int ln);
        Task<decimal> DebtForSupllier(string name);
         Task<BlSupplier>? GetSupplierByName(string n);
        decimal GeneralAmountForSupplier(Supplier s);
        Task<bool> Create(Supplier supplier);
        void RemoveSupplier(int ls);






    }
}
