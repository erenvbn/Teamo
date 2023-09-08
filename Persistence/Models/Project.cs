using System.ComponentModel.DataAnnotations;

namespace Persistence
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Navigation properties
        public ICollection<Assignment> Assignments { get; set; } // Collection navigation
    }
}
