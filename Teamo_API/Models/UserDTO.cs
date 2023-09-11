using System.ComponentModel.DataAnnotations;

namespace Teamo_API
{
    public class UserDTO
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Navigation properties
        public ICollection<CommentDTO> Comments { get; set; } // Collection navigation
    }
}
