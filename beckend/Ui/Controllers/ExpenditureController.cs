
using BL.Api;
using BL.Models;
using Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace ServerUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpendituresController : ControllerBase
    {
        IBLExpenditures bl;

        public ExpendituresController(IBL bl)
        {
            this.bl = bl.Expenditures;
        }

        [HttpGet("GetAllExpenditures")]
        public async Task<IActionResult> GetExpenditures()
        {
            return Ok(await bl.GetExpenditures());
        }

        [HttpGet("GetExpenditureById/{id}")]
        public async Task<IActionResult> GetExpenditureById(int id)
        {
            return Ok(await bl.GetExpenditureById(id));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] BlExpenditure expenditure)
        {
            return Ok(await bl.Create(expenditure));
        }

        [HttpPut("updateAmountPaid")]
        public async Task<IActionResult> UpdateAmountPaid([FromBody] Dictionary<int, decimal> dic)
        {
            if (dic == null || !dic.Any())
            {
                return BadRequest("Dictionary is required and cannot be empty");
            }

            try
            {
                Console.WriteLine($"Received dictionary with {dic.Count} items");

                // עבד על כל פריט בנפרד במקום כולם יחד
                var results = new List<object>();
                var errors = new List<string>();

                foreach (var item in dic)
                {
                    try
                    {
                        Console.WriteLine($"Processing ID: {item.Key}, Amount: {item.Value}");

                        // צור dictionary עם פריט אחד בלבד
                        var singleItemDic = new Dictionary<int, decimal> { { item.Key, item.Value } };

                        var result = await bl.UpdatePayment(singleItemDic);
                        results.Add(new { id = item.Key, amount = item.Value, success = true, result });

                        Console.WriteLine($"Successfully updated ID: {item.Key}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error updating ID {item.Key}: {ex.Message}");
                        errors.Add($"ID {item.Key}: {ex.Message}");
                        results.Add(new { id = item.Key, amount = item.Value, success = false, error = ex.Message });
                    }
                }

                Console.WriteLine($"Finished processing all items. Successful: {results.Count(r => ((dynamic)r).success)}, Failed: {errors.Count}");

                if (errors.Any())
                {
                    return StatusCode(207, new
                    { // 207 = Multi-Status
                        message = "Some updates failed",
                        totalItems = dic.Count,
                        successfulUpdates = results.Count(r => ((dynamic)r).success),
                        failedUpdates = errors.Count,
                        results = results,
                        errors = errors
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "All updates completed successfully",
                    updatedCount = dic.Count,
                    results = results
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateAmountPaid: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { error = ex.Message });
            }
        }


        [HttpPut("updateExpenditure/{id}")]
        public async Task<IActionResult> UpdateExpenditure(int id, [FromBody] BlExpenditure expenditure)
        {
            try
            {
                if (expenditure == null)
                {
                    return BadRequest("Expenditure data is required");
                }

                var result = await bl.UpdateExpenditure(expenditure, id);

                if (result == null)
                {
                    return NotFound($"Expenditure with id {id} not found");
                }

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                 bl.RemoveExpenditures(id);
                return Ok(new { message = "Expenditure deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

