using System.ComponentModel.DataAnnotations;

namespace Persistence
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Navigation properties
        public ICollection<Comment> Comments { get; set; } // Collection navigation
    }
}
