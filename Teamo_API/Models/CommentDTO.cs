using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Teamo_API
{
    public class CommentDTO
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties

        [ForeignKey("Assignment")]
        public int AssignmentId { get; set; } // Foreign key
        public AssignmentDTO Assignment { get; set; } // Reference navigation


        [ForeignKey("User")]
        public int AuthorId { get; set; } // Foreign key
        public UserDTO Author { get; set; } // Reference navigation
    }
}
