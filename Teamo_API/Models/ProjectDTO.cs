using System.ComponentModel.DataAnnotations;

namespace Teamo_API
{
    public class ProjectDTO
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Navigation properties
        public ICollection<AssignmentDTO> Assignments { get; set; } // Collection navigation
    }
}
