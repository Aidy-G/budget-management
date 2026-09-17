//using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace Dal.Api
{
    public interface IDalSuppliers
    {
        Task<List<Supplier>> GetSuppliers();

        Task<Supplier> UpdateSupllier(Supplier s, int ln);
        Task<bool> Create(Supplier supplier);

        void RemoveSupplier(int ls);

        Task<Supplier>? GetSupplierByName(string name);













    }
}
