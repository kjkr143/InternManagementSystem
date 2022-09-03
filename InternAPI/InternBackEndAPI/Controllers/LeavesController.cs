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
    public class LeavesController : ControllerBase
    {
        private readonly UserDbContext _context;
        public LeavesController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpPost("add_Designation")]
        public IActionResult AddInternLeaves([FromBody] LeavesModel leavesObj)
        {
            try
            {

                if (leavesObj == null)
                {
                    return BadRequest();
                }
                else
                {
                    _context.leaves.Add(leavesObj);
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Messsage = "Intern leaves added Successfully"
                    });
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpPut("update_internLeaves")]
        public IActionResult UpdateInternLeaves([FromBody] LeavesModel leavesObj)
        {
            if (leavesObj == null)
            {
                return BadRequest();
            }
            var user = _context.leaves.AsNoTracking().FirstOrDefault(x => x.Id == leavesObj.Id);
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
                _context.Entry(leavesObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Leaves Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_internLeaves/{id}")]
        public IActionResult DeleteInternLeaves(int id)
        {
            var user = _context.leaves.Find(id);
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
                    Message = "INternLeavesAPI Deleted"
                });
            }
        }
        [HttpGet("get_all_InternLeaves")]
        public IActionResult GetAllInternLeaves()
        {
            var user = _context.leaves.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                LeavesDetails = user
            });
        }

    }
}