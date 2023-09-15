using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Teamo_API.Models.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

        //// Navigation properties
        //public int AssignmentId { get; set; } // Foreign key
        //public int UserId { get; set; } // Foreign key
    }
}
