using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternAPI.Models
{
    public class DesignationModel
    {
        [Key]
        public int Id { get; set; }
        public string DesigntionName { get; set; }
        public string Role { get; set; }
        public string DepartmentName { get; set; }
    }
}
