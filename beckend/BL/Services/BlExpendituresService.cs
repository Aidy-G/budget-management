using BL.Api;
using BL.Models;
using Dal.Api;
//using Dal.Models;
using System.Numerics;
using System.Security.Cryptography;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Common.Models;
using System.Data.SqlTypes;
using System.Collections.Generic;

namespace BL.Services
{
    public class BlExpendituresService : IBLExpenditures
    {
        IDalExpenditures dal;
        IDalCategories ctg;
        IDalSuppliers supp;

        public BlExpendituresService(IDal data, IDal supp, IBLCategories ctg)
        {

            dal = data.Expenditures;
            this.supp = supp.Suppliers;
            //   data.Categories
            this.ctg = data.Categories;
        }

        public async Task<List<BlExpenditure>> GetExpenditures()
        {
            /*  List<Expenditure> l = dal.GetExpenditures().ToList(); */
            /*  List<BlExpenditure> l = CastingToBl(dal.GetExpenditures().ToList()).OrderByDescending(c => c.Date).ToList();
              l.Reverse();
              l.ToList();*/

            return CastingToBl(await dal.GetExpenditures()).OrderByDescending(c => c.Date).ToList();

        }

        public async Task<BlExpenditure> GetExpenditureById(int id)
        {
            var list = await GetExpenditures();
            int index = list.FindIndex(e => e.Id == id);
            return list[index];
        }


        //casting to BL
        public BlExpenditure CastingToBl(Expenditure e)
        {
            BlExpenditure bls = new BlExpenditure()
            {
                Id = e.Id,
                SchoolSymbol = e.SchoolSymbol,
                ExpenditureSum = e.ExpenditureSum,
                CategoryName = !string.IsNullOrWhiteSpace(e.CategoryName)
                    ? e.CategoryName
                    : e?.Category?.CategoryName,
                SupplierName = !string.IsNullOrWhiteSpace(e.SupplierName)
                    ? e.SupplierName
                    : e?.SupplierNumNavigation?.SupplierName,
                Date = e.Date,
                OrdererName = e.OrdererName,
                InvoiceNum = e.InvoiceNum,
                IsAccepted = e.IsAccepted,
                AmountPaid = e.AmountPaid,
                RemainToPay = e.ExpenditureSum - e.AmountPaid
            };
            return bls;
        }

        public List<BlExpenditure> CastingToBl(List<Expenditure> list)
        {
            List<BlExpenditure> bls = new List<BlExpenditure>();

            foreach (Expenditure item in list)
            {
                bls.Add(CastingToBl(item));
            }

            return bls;
        }
        //המרה לדל
        public async Task<Expenditure> CastingToDal(BlExpenditure blExpenditure)
        {
            Supplier? supplier = null;
            if (blExpenditure.SupplierId != null && blExpenditure.SupplierId != 0)
            {
                var suppliers = await supp.GetSuppliers();
                supplier = suppliers.FirstOrDefault(s => s.LicensedNum == blExpenditure.SupplierId);
            }
            else if (!string.IsNullOrWhiteSpace(blExpenditure.SupplierName))
            {
                supplier = await supp.GetSupplierByName(blExpenditure.SupplierName);
            }

            var categories = await ctg.GetCategories();
            var category = categories.FirstOrDefault(c => c.CategoryName == blExpenditure.CategoryName)
                ?? (blExpenditure.CategoryId != 0 ? categories.FirstOrDefault(c => c.CategoryId == blExpenditure.CategoryId) : null);

            Expenditure expenditure = new Expenditure()
            {
                SchoolSymbol = blExpenditure.SchoolSymbol,
                ExpenditureSum = blExpenditure.ExpenditureSum,
                CategoryId = category?.CategoryId ?? blExpenditure.CategoryId,
                CategoryName = !string.IsNullOrWhiteSpace(blExpenditure.CategoryName)
                    ? blExpenditure.CategoryName
                    : category?.CategoryName,
                SupplierNum = supplier?.LicensedNum ?? 0,
                SupplierName = !string.IsNullOrWhiteSpace(blExpenditure.SupplierName)
                    ? blExpenditure.SupplierName
                    : supplier?.SupplierName,
                Date = blExpenditure.Date,
                OrdererName = blExpenditure.OrdererName,
                InvoiceNum = blExpenditure.InvoiceNum,
                IsAccepted = blExpenditure.IsAccepted,
                AmountPaid = blExpenditure.AmountPaid,
            };
            return expenditure;
        }
        public async Task<bool> Create(BlExpenditure expenditure)
        {
            try
            {
                // בודק תקינות למשל אולי 
                await dal.Create(await CastingToDal(expenditure));
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("BlExpenditure not create");
            }
        }

        //
        //public decimal GetPaimentBySupllierId(int sId)
        //{
        //    List<Expenditure> l = dal.GetExpenditures();
        //    decimal sum = (from b in l
        //                   where b.SupplierNum == sId && !b.IsPaid
        //                   select b.ExpenditureSum).Sum();

        //    return sum;
        //}
        //חישוב סכום כולל של הוצאות
        //public decimal GetUsingBudget(int SchoolSymbol)
        //{
        //    List<Expenditure> l = dal.GetExpenditures();
        //    decimal usingBudget = (from e in l
        //                   where e.SchoolSymbol == SchoolSymbol  && e.IsPaid
        //                   select e.ExpenditureSum).Sum();

        //    return usingBudget;
        //}

        //חישוב סכום כולל בקטגוריה מסוימת
        public async Task<decimal> GetSumOfCategory(int categoryId)
        {
            List<Expenditure> l = await dal.GetExpenditures();
            decimal sumOgCategory = (from e in l
                                     where e.CategoryId == categoryId
                                     select e.ExpenditureSum).Sum();

            return sumOgCategory;
        }
        //lllllllllllllllll
        public decimal GetPaimentBySupllierId(int sId)
        {
            throw new NotImplementedException();
        }

        public decimal GetUsingBudget(int SchoolSymbol)
        {
            throw new NotImplementedException();
        }

        /* public void RemoveExpenditures(int ls)
         {
             dal.RemoveExpenditure(ls);
         }*/


        public bool RemoveExpenditures(int ls)
        {
            try
            {
                dal.RemoveExpenditure(ls);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error removing expenditure: {ex.Message}");
                return false;
            }
        }


        /*   public async Task<bool> UpdatePayment(Dictionary<int, decimal> dicPayment)
           {
               dicPayment.ToList().ForEach(async e =>await UpdateAmountPaid(e.Key,e.Value));

               return  true;
           }*/

        public async Task<bool> UpdatePayment(Dictionary<int, decimal> dicPayment)
        {
            try
            {
                // הרץ את כל העדכונים במקביל
                var tasks = dicPayment.Select(async item =>
                    await UpdateAmountPaid(item.Key, item.Value));

                await Task.WhenAll(tasks);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdatePayment: {ex.Message}");
                throw;
            }
        }

        public async Task<BlExpenditure> UpdateAmountPaid(int id, decimal sum)
        {

            List<BlExpenditure> l = await GetExpenditures();
            int i = l.FindIndex(x => x.Id == id);
            l[i].AmountPaid += sum;
            //l[i].RemainToPay-=sum;


            await dal.UpdateExpenditure(await CastingToDal(l[i]), id);
            return l[i];

        }

        public async Task<Expenditure> UpdateExpenditure(BlExpenditure expenditure, int id)
        {
            Expenditure e = await CastingToDal(expenditure);
            try
            {
                return await dal.UpdateExpenditure(e, id);

            }
            catch (Exception ex)
            {
                throw new Exception("BlExp not updated " + ex.InnerException);
            }
        }







    }
}
