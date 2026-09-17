using BL.Api;
using Common.Models;
using Microsoft.AspNetCore.Mvc;


namespace ServerUI.Controllers
{
    public class AllDataController : Controller
    {
        IBL bl;

        public AllDataController(IBL bl)
        {
            this.bl = bl;
        }
        // GET: AllDataController
        [HttpGet("GetAllData")]
        public async Task<IActionResult> GetAllData()
        {
            // וודאי שכל הפונקציות מחזירות Task ומוגדרות כ-async
            //var users = await bl.Users.GetUsers();
            //Console.WriteLine("hvjvjvjvjvjvjvjvjvjvjvjvj");
            //Console.WriteLine(users.Count);
            //Console.WriteLine("sssssssssssssssssss");

            //var categories = await bl.Categories.GetCategories();
            //var schools = await bl.Schools.GetSchools();
            //var expenditures = await bl.Expenditures.GetExpenditures();
            //var suppliers = await bl.Suppliers.GetSuppliers();
            //Console.WriteLine("hvjvjvjvjvjvjvjvjvjvjvjvj");
            //Console.WriteLine(suppliers.Count);
            //Console.WriteLine("sssssssssssssssssss");
            //var result = new
            //{
            //    users,
            //    categories,
            //    schools,
            //    expenditures,
            //    suppliers
            //};
            //return Ok(result);

            //    return Ok( (users,
            //         categories,
            //         schools, 
            //        expenditures,
            //        suppliers));
            //}
            //users : await bl.Users.GetUsers(),
            //categories: await bl.Categories.GetCategories(),


            //schools : await bl.Schools.GetSchools(),
            //expenditures : await bl.Expenditures.GetExpenditures(), 
            //suppliers: await bl.Suppliers.GetSuppliers()

            return Ok(
                (
                users: await bl.Users.GetUsers(),
                categories: await bl.Categories.GetCategories(),
                schools: await bl.Schools.GetSchools(),
                expenditures: await bl.Expenditures.GetExpenditures(),
                suppliers : await bl.Suppliers.GetSuppliers()
            ));


        }
    }
}


