using System.ComponentModel.DataAnnotations;

namespace Persistence
{
    public class AppCredentials
    {
        [Key]
        public int Id { get; set; }
        public string AppName { get; set; }
        public string AppDescription { get; set; }
        public string AppContactMail { get; set; }
        public string AppContactPhone { get; set; }
    }
}
