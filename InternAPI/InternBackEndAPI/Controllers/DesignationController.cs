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
    public class DesignationController : ControllerBase
    {
        private readonly UserDbContext _context;
        public DesignationController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpPost("add_Designation")]
        public IActionResult AddIntern([FromBody] DesignationModel designationObj)
        {
            try
            {

                if (designationObj == null)
                {
                    return BadRequest();
                }
                else
                {
                    _context.designationModels.Add(designationObj);
                    _context.SaveChanges();
                    return Ok(new
                    {
                        StatusCode = 200,
                        Messsage = "Intern designation added Successfully"
                    });
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
        [HttpPut("update_designation")]
        public IActionResult UpdateDesignation([FromBody] DesignationModel designationObj)
        {
            if (designationObj == null)
            {
                return BadRequest();
            }
            var user = _context.designationModels.AsNoTracking().FirstOrDefault(x => x.Id == designationObj.Id);
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
                _context.Entry(designationObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Designation Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_designation/{id}")]
        public IActionResult DeleteDesignation(int id)
        {
            var user = _context.designationModels.Find(id);
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
                    Message = "DesignationAPI Deleted"
                });
            }
        }
        [HttpGet("get_all_Designation")]
        public IActionResult GetAllIntern()
        {
            var designation = _context.designationModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                DesignationDetails = designation
            });
        }
    }
}
