using BL.Api;
using BL.Models;
using Dal;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Common.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BL.Services
{
    public class BlCategoriesService : IBLCategories
    {
        IDalCategories dal;

        public BlCategoriesService(IDal data)
        {
            dal = data.Categories;
        }



        public async Task<List<Category>> GetCategories()=>
             await dal.GetCategories();
        



        public async Task<Category?> GetCategoryById(int id) {
            var data = await GetCategories();
            Category c= data.FirstOrDefault(c => c.CategoryId == id)!;
            return c;
        }


        public async Task<Category?> GetCategoryById2(int id) =>
            (await GetCategories()).FirstOrDefault(c => c.CategoryId == id)!;
         
        public async Task<Category?> GetCategoryByName(string name)=>
            (await GetCategories()).Find(c => c.CategoryName == name);
           
        


        ////Casting to BL
        //public BlCategory CastingToBl(Category c)
        //{
        //    BlCategory bls = new BlCategory()
        //    {
        //       CategoryId = c.CategoryId,
        //       CategoryName = c.CategoryName,
        //       Expenditures = exp.CastingToBl(c.Expenditures.ToList()),

        //    };
        //    return bls;
        //}
        ////Casting a list to bl
        //public List<BlCategory> CastingToBl(List<Category> list)
        //{
        //    List<BlCategory> bls = new List<BlCategory>();

        //    foreach (Category item in list)
        //    {
        //        bls.Add(CastingToBl(item));
        //    }

        //    return bls;
        //}

        //חוב קטגוריה
        public Category Casting(Category c)
        {
            Category ctg = new Category()
            {
                CategoryName = c.CategoryName,
            };
            return ctg;
        }
        public async Task<decimal> GetDebtSum(string cName)
        {
            decimal sum = 0;
            Category c = await GetCategoryByName(cName);
            c?.Expenditures.ToList().ForEach(s => sum += (s.ExpenditureSum - s.AmountPaid));
            return sum;
        }

        // סכום הוצאות  של קטגוריה מסוימת 
        public async Task<decimal> GetSumEpendituresOfCategory(string name)
        {
            decimal sum = 0;
            Category c = await GetCategoryByName(name);
            c?.Expenditures.ToList().ForEach(x =>
            { sum += x.ExpenditureSum; }
            );
            return sum;
        }

        public async Task<bool> Create(Category category)
        {
            try
            {
                await dal.Create(category);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("BlCategory not create");
            }
        }
        public Category UpdateCategory(Category category, int id)
        {
            return dal.UpdateCategory(category, id);
        }
        public void RemoveCategory(int id)
        {
            dal.RemoveCategory(id);
        }
    }

}
