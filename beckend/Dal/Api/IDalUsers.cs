using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Dal.Models;
using Common.Models;
namespace Dal.Api
{
    public interface IDalUsers
    {

        Task<List<User>> GetUsers();
        Task<List<User>> GetAllUsers();

        Task<User> UpdateUser(User user, long id);
         Task<bool> Create(User user);
        void RemoveUser(long id);

    }
}
