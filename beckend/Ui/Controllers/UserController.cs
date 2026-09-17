using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Api;
using Common.Models;


namespace Ui.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: UserController

        IBLUsers bl;

        public UserController(IBL bl)
        {
            this.bl = bl.Users;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await bl.GetUsers());
        }
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await bl.GetAllUsers());
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetUserById(int id)
        {
            return Ok(await bl.GetUserById(id));
        }
        [HttpPut("updateUser/{user}")]
        public async Task<IActionResult> UpdateUsre([FromBody] User u, long id)
        {
            return Ok(await bl.UpdateUser(u, id));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            return Ok(await bl.Create(user));

        }

        // DELETE api/<SupplierController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            bl.RemoveUser(id);
        }



    }
}
