using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Persistence
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties

        [ForeignKey("Assignment")]
        public int AssignmentId { get; set; } // Foreign key
        public Assignment Assignment { get; set; } // Reference navigation


        [ForeignKey("User")]
        public int AuthorId { get; set; } // Foreign key
        public User Author { get; set; } // Reference navigation
    }
}
