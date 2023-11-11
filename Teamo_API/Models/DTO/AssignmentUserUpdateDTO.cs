using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Teamo_API.Models.DTO
{
    public class AssignmentUserUpdateDTO
    {
        public int AssignmentId { get; set; } // Foreign key to Assignment
        public List<int> UserIds { get; set; } // Foreign key to User
    }
}