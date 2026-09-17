using Dal.Api;
//using Dal.Models;
using BL.Api;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
using Dal.Services;
using Microsoft.EntityFrameworkCore;

namespace BL.Services
{
    public class BlUsersService : IBLUsers
    {
        IDalUsers dal;

        public BlUsersService(IDal data)
        {
            dal = data.Users;
        }
        public async Task<List<User>> GetUsers()
        {
            var userList = await dal.GetUsers();
            return userList.OrderBy(e => e.UserName).ToList();
        }
        public async Task<List<User>> GetAllUsers()
        {
            var userList = await dal.GetAllUsers();
            return userList.OrderBy(e => e.UserName).ToList();
        }

        public async Task<User> GetUserById(long id)
         {
            var v =  (await dal.GetAllUsers()).Find(u => u.Id.Equals(id));
            if (v == null)
                return new User();
            else return v;
           
          }
        

        public async Task<User> GetUserByName(string name)=>
         (await dal.GetUsers()).Find(u => u.UserName.Equals(name))!;
        


        public async Task<List<User>> GetUsersBySchoolSymbol(int symbol) =>
             (await dal.GetUsers()).FindAll(u => u.SchoolSymbol == symbol);
        


        public void RemoveUser(long id)
        {
            dal.RemoveUser(id);
        }

        public async Task<User> UpdateUser(User user, long id)
        {
            try
            {
                return await dal.UpdateUser(user, id);
            }

            catch (Exception ex) { 
            throw new Exception("Bluser not update");
        }
            
        }
            
        public async Task<bool> Create(User user)
        {
            try
            {
               await dal.Create(user);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Bluser not create");
            }
        }
    }
}
