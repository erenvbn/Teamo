using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Teamo_API.Models.DTO
{
    public class AssignmentUserDTO
    {
        public int Id { get; set; } // Optional: You can use it if needed
        public int AssignmentId { get; set; } // Foreign key to Assignment
        public int UserId { get; set; } // Foreign key to User
    }
}
