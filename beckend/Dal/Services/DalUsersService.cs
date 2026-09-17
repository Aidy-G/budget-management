using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
using Microsoft.EntityFrameworkCore;
namespace Dal.Services
{
    public class DalUsersService : IDalUsers
    {
        dbcontext data;

        public DalUsersService(dbcontext data)
        {
            this.data = data;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await data.Users.ToListAsync();
        }

        public async Task<List<User>> GetUsers()
        {
            return await data.Users.Where(u => u.SchoolSymbol != 0).ToListAsync();
        }
        public async Task<User> UpdateUser(User user, long id)
        {
            User u = data.Users.FirstOrDefault(u => u.Id == id)!;
            if(u != null) {

                u.Id = id;
                u.UserName = user.UserName;
                u.SchoolSymbol = user.SchoolSymbol;
                
            }
            data.SaveChanges();
            return u;
        }

        public async Task<bool> Create(User user)
        {
            try
            {
                data.Users.Add(user);
                try
                {
                    data.SaveChanges();
                    return true;
                }
                catch
                {
                    data.Users.Local.Remove(user);
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw new Exception("user didn't create");
            }
        }
        public async void RemoveUser(long id)
        {
            try
            {
                var list = await GetUsers();
                var u = list.ToList().Find(u => u.Id == id);
                // להוסיף לכידת שגיאה
                data.Users.Remove(u);
                data.SaveChanges();
            }
            catch (Exception ex)
            {

                throw new Exception("User didnt removed");

            }

        }


    }
}
