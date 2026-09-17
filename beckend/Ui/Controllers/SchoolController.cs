using System.Threading.Tasks;
using BL.Api;
using Common.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        IBLSchools bl;

        public SchoolController(IBL bl)
        {
            this.bl = bl.Schools;
        }

        [HttpGet]
        public async Task<IActionResult> GetSchools()
        {
            return Ok(await bl.GetSchools()!);
        }

        [HttpGet("GetSchoolBySymbol/{s}")]
        public async Task<IActionResult> GetSchoolBySymbol(int s)
        {
            return Ok(await bl.GetSchoolBySymbol(s)!);
        }

        [HttpGet("GetExpenditures/{s}")]
        public async Task<IActionResult> GetExpendituresOfSchool(int s)
        {
            return Ok(await bl.GetExpendituresOfSchool(s));
        }

        [HttpGet("GetDebtOfSchool/{name}")]
        public IActionResult GetDebtOfSchool(string name)
        {
            return Ok(bl.GetDebtOfSchool(name));
        }

        [HttpGet("GetSumOfEpendituresOfSchool/{schoolSymbol:int}")]
        public async Task<decimal> GetSumOfEpendituresOfSchool(int schoolSymbol)
        {
            return await bl.GetSumOfEpendituresOfSchool(schoolSymbol);
        }

        [HttpPut("updateSchool/{school}")]
        public async Task<IActionResult> UpdateSchool([FromBody] School school, int schoolSymbol)
        {
             return Ok(await bl.UpdateSchool(school, schoolSymbol));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] School school)
        {
            return Ok(await bl.Create(school)!);

        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            bl.RemoveSchool(id);
        }
    }
}
