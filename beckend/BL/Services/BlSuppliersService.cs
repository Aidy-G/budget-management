using Dal.Api;
//using Dal.Models;
using BL.Api;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.Cryptography;
using Common.Models;
namespace BL.Services
{
    public class BlSuppliersService : IBLSuppliers
    {
        IDalSuppliers dal;
        IBLExpenditures exp;
        IBLSchools schools;
        public BlSuppliersService(IDal data, IBLExpenditures exp, IBLSchools schools)
        {
            dal = data.Suppliers;
            this.exp = exp;
            this.schools = schools;
        }


        public async Task<List<BlSupplier>> GetSuppliers() =>
            await CastingToBl(await dal.GetSuppliers());

        public async Task<BlSupplier>? GetSupplierByName(string n)=>
         (await GetSuppliers()).Find(s => s.SupplierName == n)!;
        


        public async Task<BlSupplier>? GetSupplierByLicensedNum(int licensedNum) =>
             (await GetSuppliers()).Find(s => s.LicensedNum == licensedNum)!;
        
     
        //public async Task<List<BlSupplier>> ? GetSuppliersForSchool(int schoolS)//=>
        //{

        //    var supplier = await GetSuppliers();

        //    var school = await schools.GetSchoolBySymbol(schoolS);
        //    return  (from a in supplier
        //             join e in school.Expenditures
        //             on a.LicensedNum equals GetSupplierByName(e?.SupplierName)?.Result.LicensedNum 
        //             select a).Distinct<BlSupplier>().ToList();

        //}

        //Casting to BL
        public async Task<BlSupplier> CastingToBl(Supplier s)
        {
            BlSupplier bls = new BlSupplier()
            {
                SupplierName = s.SupplierName,
                LicensedNum = s.LicensedNum,
                BankCode = s.BankCode,
                NumOfBankBranch = s.NumOfBankBranch,
                NumOfBankAccount = s.NumOfBankAccount,
                NameOfOwnerAccount = s.NameOfOwnerAccount,
                Expenditures =exp.CastingToBl(s.Expenditures.ToList()),
                PaymentForSupllier = GeneralAmountForSupplier(s),
                DebtForSupllier = await DebtForSupllier(s.SupplierName),

            };
            return bls;
        }
        //Casting a list to bl
        public async Task< List<BlSupplier>> CastingToBl(List<Supplier> list)
        {
            List<BlSupplier> bls = new List<BlSupplier>();

            foreach (Supplier item in list)
            {
                bls.Add( await CastingToBl(item));
            }

            return bls;
        }

        public async Task<Supplier> UpdateSupllier(Supplier s, int ln)
        {
            try
            {
               return  await dal.UpdateSupllier(s, ln);
            }
            catch (Exception ex)
            {
                throw new Exception("not updated");
            }
        }

            


        //public void UpdatePayment(int sId ,decimal payment)
        //{
        //    Supplier supplier = dal.GetSupplierByLicensed(sId);

        //    BlSupplier bls = Casting(supplier, payment);

        //}

        //חישוב סכום חוב לספק מסוים
        public async Task<decimal> DebtForSupllier(string name)
        {
            //BlSupplier s = GetSuppliers().ToList().Find(s=>s.SupplierName == name);
            var list = await dal.GetSuppliers();
            Supplier s = list.Find(s => s.SupplierName == name)!;
            decimal debt = 0;
            s.Expenditures.ToList().ForEach(x =>
            { debt += (x.ExpenditureSum - x.AmountPaid); });
            return debt;

            //decimal PaymentOfSupllier = (from ss in s.Expenditures  
            //                             where !ss.amountPaid == ss.ExpenditureSum 
            //                             select ss.ExpenditureSum 
            //                             ).Sum();


        }


        public decimal GeneralAmountForSupplier(Supplier s)
        {
            decimal generalAmount = 0;
            s.Expenditures.ToList().ForEach(x =>
            { generalAmount += x.ExpenditureSum; });
            return generalAmount;
        }

        public async Task<bool> Create(Supplier supplier)
        {
            try
            {
                dal.Create(supplier);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Blsupp not create");
            }
        }

        public void RemoveSupplier(int ls)
        {
            dal.RemoveSupplier(ls);
        }

     /*   Task<List<BlSupplier>>? IBLSuppliers.GetSuppliersForSchool(int schoolS)
        {
            throw new NotImplementedException();
        }*/

      
    }
}
