using Persistence;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Teamo_API.Models.DTO
{
    public class AssignmentUserDTO
    {
        public int AssignmentId { get; set; }
        public List<int> UserIds { get; set; }
    }
}
