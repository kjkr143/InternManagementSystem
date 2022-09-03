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
    public class InternController : ControllerBase
    {
        private readonly UserDbContext _context;
        public InternController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpPost("add_Intern")]
        public IActionResult AddIntern([FromBody] InternModel internObj)
        {
        try
        {

            if (internObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.internModels.Add(internObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Messsage = "Intern added Successfully"
                });
            }
        }
        catch (Exception)
        {

            throw;
        }

    }
        [HttpPut("update_intern")]
        public IActionResult UpdateIntern([FromBody] InternModel internObj)
        {
            if (internObj == null)
            {
                return BadRequest();
            }
            var user = _context.internModels.AsNoTracking().FirstOrDefault(x => x.Id == internObj.Id);
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
                _context.Entry(internObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Intern Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_intern/{id}")]
        public IActionResult DeleteIntern(int id)
        {
            var user = _context.internModels.Find(id);
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
                    Message = "InternAPI Deleted"
                });
            }
        }
        [HttpGet("get_all_Intern")]
        public IActionResult GetAllIntern()
        {
            var interns = _context.internModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                InternDetails = interns
            });
        }
    }
}
