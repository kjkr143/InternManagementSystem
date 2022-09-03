using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternAPI.Models
{
    public class WorkingHoursModel
    {
        [Key]
        public int Id { get; set; }
        public string InternName { get; set; }
        public string CompanyHours { get; set; }
        public string InternHours { get; set; }
        public string EndingHours { get; set; }
    }
}
