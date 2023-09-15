using System.ComponentModel.DataAnnotations;

namespace Teamo_API.Models.DTO
{
    public class ProjectDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        //// Navigation properties
        //public ICollection<int> AssignmentIds { get; set; } // Collection navigation
    }
}
