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
    public class StatusController : ControllerBase
    {
        private readonly UserDbContext _context;
        public StatusController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpPost("add_InternStatus")]
        public IActionResult AddInternStatus([FromBody] StatusModel statusObj)
        {
            try
            {

                if (statusObj == null)
                {
                    return BadRequest();
                }
                else
                {
                    _context.statusModels.Add(statusObj);
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Messsage = "Intern status added Successfully"
                    });
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpPut("update_InternStatus")]
        public IActionResult UpdateInternStatus([FromBody] StatusModel statusObj)
        {
            if (statusObj == null)
            {
                return BadRequest();
            }
            var user = _context.statusModels.AsNoTracking().FirstOrDefault(x => x.Id == statusObj.Id);
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
                _context.Entry(statusObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Status Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_InternStatus/{id}")]
        public IActionResult DeleteInternStatus(int id)
        {
            var user = _context.statusModels.Find(id);
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
                    Message = "InternStatusAPI Deleted"
                });
            }
        }
        [HttpGet("get_all_InternStatus")]
        public IActionResult GetAllInternStatus()
        {
            var user = _context.statusModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                LeavesDetails = user
            });
        }

    }
}