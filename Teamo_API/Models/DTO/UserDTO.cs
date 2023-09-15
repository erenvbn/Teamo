using System.ComponentModel.DataAnnotations;

namespace Teamo_API.Models.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        //// Navigation properties
        //public ICollection<int> CommentIds { get; set; } // Collection navigation
        //public ICollection<int> AssignmentIds { get; set; } // Collection navigation
    }
}
