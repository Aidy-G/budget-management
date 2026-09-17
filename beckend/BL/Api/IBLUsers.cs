//using Dal.Models;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
namespace BL.Api
{
    public interface IBLUsers
    {
        Task<List<User>> GetUsers();
        Task<List<User>> GetAllUsers();

        Task<User> GetUserById(long id);

        Task<User> GetUserByName(string name);

        Task<List<User>> GetUsersBySchoolSymbol(int symbol);

        //User CastingToBl(User user);

        //List<User> CastingToBl(List<User> l);
        Task<User> UpdateUser(User u,long id);

        Task<bool> Create(User user);
        void RemoveUser(long id);
    }
}
