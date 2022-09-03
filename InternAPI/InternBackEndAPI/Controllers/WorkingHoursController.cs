using InternAPI.Data;
using InternAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkingHoursController : ControllerBase
    {
        private readonly UserDbContext _context;
        public WorkingHoursController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpPost("add_WorkingHours")]
        public IActionResult AddWorkingHours([FromBody] WorkingHoursModel hoursObj)
        {
            try
            {

                if (hoursObj == null)
                {
                    return BadRequest();
                }
                else
                {
                    _context.workingHours.Add(hoursObj);
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Messsage = "Intern working hours added Successfully"
                    });
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpPut("update_WorkingHours")]
        public IActionResult UpdateWorkingHours([FromBody] WorkingHoursModel hoursObj)
        {
            if (hoursObj == null)
            {
                return BadRequest();
            }
            var user = _context.workingHours.AsNoTracking().FirstOrDefault(x => x.Id == hoursObj.Id);
            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Entry(hoursObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Working hours Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_WorkingHours/{id}")]
        public IActionResult DeleteWorkingHours(int id)
        {
            var user = _context.workingHours.Find(id);
            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "user not Found"
                });
            }
            else
            {
                _context.Remove(user);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "WorkingHoursnAPI Deleted"
                });
            }
        }
        [HttpGet("get_all_InternWorkingHours")]
        public IActionResult GetAllInternHours()
        {
            var user = _context.workingHours.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                WorkingHoursDetails = user
            }) ;
        }
        
    }
}
