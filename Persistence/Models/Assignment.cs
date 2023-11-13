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
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }


        // Navigation properties
        [ForeignKey("Priority")]
        public int Priority { get; set; } // Foreign key

        [ForeignKey("Status")]
        public int Status { get; set; } // Foreign key

        [ForeignKey("Project")]
        public int ProjectId { get; set; } // Foreign key

    }
}
