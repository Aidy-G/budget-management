using BL.Api;
using Common.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        IBLSuppliers bl;

        public SupplierController(IBL bl)
        {
            this.bl = bl.Suppliers;
        }


        // GET: api/<SupplierController>
        [HttpGet("Get")]
        public async Task<IActionResult> GetSuppliers()
        {
            return Ok(await bl.GetSuppliers());
        }

        [HttpGet("GetSupplierByName/{name}")]
        public async Task<IActionResult> GetSupplierByName(string name)
        {
            return Ok(await bl.GetSupplierByName(name)!);
        }
        [HttpGet("GetSupplierByLnum/{licensedNum}")]
        public async Task<IActionResult> GetSupplierByLicensedNum(int licensedNum)
        {
            return Ok(await bl.GetSupplierByLicensedNum(licensedNum)!);
        }
        // GET: api/<SupplierController>
        [HttpGet("DebtForSupllier/{name}")]
        public IActionResult DebtForSupllier(string name)
        {
            return Ok(bl.DebtForSupllier(name));
        }
        //// GET api/<SupplierController>/5
        //[HttpGet("GetSuppliersForSchool/{id}")]
        //public IActionResult GetsOfSchool(int id)
        //{
        //    return Ok(bl.GetSuppliersForSchool(id));
        //}

        // PUT api/<SupplierController>/5
        [HttpPut("updateSupplier/{ln}")]
        public async Task<IActionResult> UpdateSupplier([FromBody] Supplier s, int ln)
        {
            return Ok(await bl.UpdateSupllier(s, ln));
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Supplier supplier)
        {
            return Ok(await bl.Create(supplier)!);
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            bl.RemoveSupplier(id);
        }
    }
}
