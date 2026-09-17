using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace Dal.Services
{
    public class DalSuppliersService : IDalSuppliers
    {
        dbcontext data;

        public DalSuppliersService(dbcontext data)
        {
            this.data = data;
        }

        public async Task<List<Supplier>> GetSuppliers()
        {
            return await data.Suppliers.ToListAsync();
        }




        public async  Task<Supplier> UpdateSupllier(Supplier s, int ln)
        {
            Supplier supp = data.Suppliers.FirstOrDefault(s => s.LicensedNum == ln)!;
            if( supp != null ) {
                var oldSupplierName = supp.SupplierName;

                supp.SupplierName = s.SupplierName;
                supp.NumOfBankBranch = s.NumOfBankBranch;
                supp.NumOfBankAccount = s.NumOfBankAccount;
                supp.NameOfOwnerAccount = s.NameOfOwnerAccount;
                supp.BankCode = s.BankCode;

                if (!string.IsNullOrWhiteSpace(oldSupplierName) && oldSupplierName != s.SupplierName)
                {
                    var relatedExpenditures = data.Expenditures
                        .Where(e => e.SupplierNum == ln)
                        .ToList();

                    foreach (var expenditure in relatedExpenditures)
                    {
                        expenditure.SupplierName = s.SupplierName;
                    }
                }
            }
            data.SaveChanges();
            return  supp;
        }

        public async Task<bool> Create(Supplier supplier)
        {
            try
            {
                data.Suppliers.Add(supplier);
                try
                {
                    data.SaveChanges();
                }
                catch
                {
                    data.Suppliers.Local.Remove(supplier);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("supplier didn't create");
            }
        }



        public async void RemoveSupplier(int ls)
        {
            try
            {
                var list =await GetSuppliers();
                var r = list.Find(s => s.LicensedNum == ls);
                data.Suppliers.Remove(r);
                data.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Supplier didnt removed");
            }

        }

        public async Task<Supplier>? GetSupplierByName(string name)
        {
            var suppliers = await GetSuppliers();
            return suppliers.Find(s=> s.SupplierName == name)!;
        }

    }
}
