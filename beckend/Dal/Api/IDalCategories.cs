//using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace Dal.Api
{
    public interface IDalCategories
    {

        Task<List<Category>> GetCategories();

        Category UpdateCategory(Category category, int id);
        Task<bool> Create(Category category);
        void RemoveCategory(int id);


    }
}
