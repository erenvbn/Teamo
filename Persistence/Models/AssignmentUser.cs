using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    public class AssignmentUser
    {
        [Key]
        public int Id { get; set; } // Optional: You can use it if needed

        [ForeignKey("Assignment")]
        public int AssignmentId { get; set; } // Foreign key to Assignment
        //public Assignment Assignment { get; set; } // Navigation property

        [ForeignKey("User")]
        public int UserId { get; set; } // Foreign key to User
        //public User User { get; set; } // Navigation property
    }
}
