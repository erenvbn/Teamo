using System.ComponentModel.DataAnnotations;

namespace Persistence
{
    public class Status
    {
        [Key]
        public int Id { get; set; }
        public string StatusTitle { get; set; }

    }
}
