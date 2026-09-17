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
    public class DalSchoolsService : IDalSchools
    {
        dbcontext data;

        public DalSchoolsService(dbcontext data)
        {
            this.data = data;
        }

        public async Task<List<School>> GetSchools()
        {
            return await data.Schools
                .Include(s => s.Expenditures)
                    .ThenInclude(e => e.Category)
                .Include(s => s.Expenditures)
                    .ThenInclude(e => e.SupplierNumNavigation)
                .Where(s => s.SchoolSymbol != 0)
                .ToListAsync();
        }

        public async Task<School> UpdateSchool(School school, int sSymbol)
        {
            School s =  data.Schools.FirstOrDefault(s => s.SchoolSymbol == sSymbol)!;
            s.SchoolName = school.SchoolName;
            data.SaveChanges();
            return s;
        }
        public async Task<bool> Create(School school)
        {
            try
            {
                data.Schools.Add(school);
                try
                {

                    data.SaveChanges();
                }
                catch (Exception ex)
                {
                    data.Schools.Local.Remove(school);
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("school not create");
            }
        }


        public async void RemoveSchool(int sSymbol)
        {
            try
            {
                var list =await GetSchools();
                var s = list.Find(s => s.SchoolSymbol == sSymbol);
                data.Schools.Remove(s);
                data.SaveChanges();
            }
            catch (Exception ex)
            {

                throw new Exception("School didnt removed");

            }

        }

    }
}
