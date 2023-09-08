using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Persistence
{
    public class Assignment
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }

        // Navigation properties

        [ForeignKey("Project")]
        public int ProjectId { get; set; } // Foreign key
        public Project Project { get; set; } // Reference navigation
        public ICollection<Comment> Comments { get; set; } // Collection navigation
    }
}
