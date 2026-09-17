//using Dal.Api;
//using Dal.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Reflection.Metadata;
//using System.Text;
//using System.Threading.Tasks;
//using Common.Models;
//namespace Dal.Services
//{
//    public class DalCategoriesService : IDalCategories
//    {
//        dbcontext data;

//        public DalCategoriesService(dbcontext data)
//        {
//            this.data = data;
//        }

//        public async Task<List<Category>> GetCategories()
//        {
//            return await data.Categories.Include(c=>c.Expenditures).ToListAsync();
//        }

//        public  Category UpdateCategory(Category category, int id)
//        {
//            Category cat = data.Categories.FirstOrDefault(c => c.CategoryId == id)!;
//            cat.CategoryName = category.CategoryName;
//            await data.SaveChanges();
//            return cat;
//         }
//        public async Task<bool> Create(Category category)
//        {
//            try
//            {
//                data.Categories.Add(category);
//                try
//                {
//                   await data.SaveChangesAsync();
//                }
//                catch
//                {
//                    data.Categories.Local.Remove(category);
//                }
//                return true;
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("category didn't create");
//            }
//        }
//        public void RemoveCategory(int id)
//        {
//            try
//            {
//                var c = data.Categories.FirstOrDefault(c => c.CategoryId == id)!;
//                data.Categories.Remove(c);
//                 await data.SaveChanges();
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("category didnt removed");
//            }
//        }

//    }
//}

using Dal.Api;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace Dal.Services
{
    public class DalCategoriesService : IDalCategories
    {
        private readonly dbcontext data;

        public DalCategoriesService(dbcontext data)
        {
            this.data = data;
        }

        public async Task<List<Category>> GetCategories()
        {
            return await data.Categories.Include(c => c.Expenditures).ToListAsync();
        }

        public Category UpdateCategory(Category category, int id)
        {
            Category cat = data.Categories.FirstOrDefault(c => c.CategoryId == id)!;
            if (cat == null)
            {
                return category;
            }

            var oldCategoryName = cat.CategoryName;
            cat.CategoryName = category.CategoryName;

            if (!string.IsNullOrWhiteSpace(oldCategoryName) && oldCategoryName != category.CategoryName)
            {
                var relatedExpenditures = data.Expenditures
                    .Where(e => e.CategoryId == id)
                    .ToList();

                foreach (var expenditure in relatedExpenditures)
                {
                    expenditure.CategoryName = category.CategoryName;
                }
            }

            data.SaveChanges();
            return cat;
        }

        public async Task<bool> Create(Category category)
        {
            try
            {
                data.Categories.Add(category);
                try
                {
                    await data.SaveChangesAsync(); // הוספתי await כאן!
                }
                catch
                {
                    data.Categories.Local.Remove(category);
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public void RemoveCategory(int id)
        {
            try
            {
                var c = data.Categories.FirstOrDefault(c => c.CategoryId == id)!;
                data.Categories.Remove(c);
                data.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("category didnt removed");
            }
        }

        // הוספתי פונקציות חסרות שה-BL צריך
        public async Task<Category?> GetCategoryById(int id)
        {
            return await data.Categories.FindAsync(id);
        }

        public async Task<Category?> GetCategoryByName(string name)
        {
            return await data.Categories.FirstOrDefaultAsync(c => c.CategoryName == name);
        }

        public async Task<decimal> GetDebtSum(string categoryName)
        {
            try
            {
                var category = await data.Categories
                    .Include(c => c.Expenditures)
                    .FirstOrDefaultAsync(c => c.CategoryName == categoryName);

                if (category == null) return 0;

                return category.Expenditures
                    .Where(e => !e.IsAccepted)
                    .Sum(e => e.ExpenditureSum - e.AmountPaid);
            }
            catch
            {
                return 0;
            }
        }
    }
}

