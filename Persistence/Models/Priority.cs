using System.ComponentModel.DataAnnotations;

namespace Persistence
{
    public class Priority
    {
        [Key]
        public int Id { get; set; }
        public string PriorityTitle { get; set; }

    }
}
