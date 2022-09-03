using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InternAPI.Models
{
    public class LeavesModel
    {
        [Key]
        public int Id { get; set; }
        public string InternName { get; set; }
        public string StartDate { get; set; }
        public string LastDate { get; set; }

    }
}
