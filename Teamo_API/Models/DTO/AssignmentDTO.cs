using Persistence;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Teamo_API.Models.DTO
{
    public class AssignmentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public int ProjectId { get; set; }

        ////Navigation Properties
        //public int ProjectId { get; set; } // Foreign key
        //public ICollection<int> UserIds { get; set; } //User Collection
    }
}
