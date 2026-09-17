using BL.Api;
using BL.Models;
using Common;
using Microsoft.AspNetCore.Mvc;
using Common.Models;
using Microsoft.EntityFrameworkCore;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {

        IBLCategories bl;

        public CategoryController(IBL bl)
        {
            this.bl = bl.Categories;
        }
        // GET: api/<CategoryController>
        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var data = await bl.GetCategories();
            return Ok(data);
        }

        [HttpGet("GetCategoryBtId/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            return Ok( await bl.GetCategoryById(id));
        }

        [HttpGet("GetCategoryByName/{n}")]
        public async Task<IActionResult> GetCategoryByName(string n)
        {
            return Ok(await bl.GetCategoryByName(n));
        }
        //חוב קטגוריה
        [HttpGet("GetDebtSum/{name}")]

        public IActionResult GetDebtSum(string name)
        {
            return Ok(bl.GetDebtSum(name));
        }
        //סכום קטגוריה
        [HttpGet("GetSumEpendituresOfCategory/{name}")]

        public IActionResult GetSumEpendituresOfCategory(string name)
        {
            return Ok(bl.GetSumEpendituresOfCategory(name));
        }



        //// GET api/<CategoryController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}
        /*bool Create(Category category)

        void UpdateCategory(Category category, int id)*/
        // POST api/<CategoryController>

        //[HttpPost("create")]
        //public async Task<IActionResult> Create([FromBody] Category category)
        //{
        //    return Ok(bl.Create(category));

        //}
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Category category)
        {
            return Ok( await bl.Create(category));

            //bool result = await bl.Create(category);
            //return Ok(result);
        }

        // PUT api/<CategoryController>/5
        [HttpPut("UpdateCategory/{id}")]
        public IActionResult UpdateCategory([FromBody] Category category, int id)
        {
            return Ok(bl.UpdateCategory(category, id));
        }

        // DELETE api/<CategoryController>/5
        //[HttpDelete("removeCategory/{id}")]
        //public IActionResult RemoveCategory(int id)
        //{
        //    return Ok(bl.RemoveCategory(id)); 
        //}


        // DELETE api/<SupplierController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            bl.RemoveCategory(id);
        }
    }
}
