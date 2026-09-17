using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
using System.Collections;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services
{
    public class DalExpendituresService : IDalExpenditures
    {
        dbcontext data;

        public DalExpendituresService(dbcontext data)
        {
            this.data = data;
        }
        public async Task<List<Expenditure>> GetExpenditures()=>
             await data.Expenditures.Include(e=>e.Category).Include(e=>e.SupplierNumNavigation).ToListAsync();

        public async Task<Expenditure?> GetExpenditureById(int id) =>
            await data.Expenditures
                .Include(e => e.Category)
                .Include(e => e.SupplierNumNavigation)
                .FirstOrDefaultAsync(e => e.Id == id);

        public async Task<Expenditure> UpdateExpenditure(Expenditure expenditure, int id)
        {
           Expenditure e = data.Expenditures.FirstOrDefault(e => e.Id == id)!;
            if(e != null)
            {
                e.SchoolSymbol = expenditure.SchoolSymbol;
                e.ExpenditureSum = expenditure.ExpenditureSum;
                e.CategoryId = expenditure.CategoryId;
                e.CategoryName = expenditure.CategoryName;
                e.SupplierNum = expenditure.SupplierNum;
                e.SupplierName = expenditure.SupplierName;
                e.Date = expenditure.Date;
                e.OrdererName = expenditure.OrdererName;
                e.InvoiceNum = expenditure.InvoiceNum;
                e.IsAccepted = expenditure.IsAccepted;
                e.AmountPaid = expenditure.AmountPaid;
               
                
            }
            data.SaveChanges();
            return e;

        }

        public async Task<bool> Create(Expenditure expenditure)
        {
            try
            {
                data.Expenditures.Add(expenditure);
                try
                {
               
                    data.SaveChanges();
                }
                catch (Exception ex) {
                    data.Expenditures.Local.Remove(expenditure);
                    return false;
                }
               
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("expenditure not create");
            }
        }


        public async void RemoveExpenditure(int id)
        {
            try
            {
                var list = await GetExpenditures();
                var e = list.Find(e => e.Id == id);
                data.Expenditures.Remove(e);
                data.SaveChanges();
            }
            catch (Exception ex)
            {

                throw new Exception("Expenditure didnt removed");

            }

        }

       
    }
}
