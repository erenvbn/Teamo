﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Persistence
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties

        [ForeignKey("Assignment")]
        public int AssignmentId { get; set; } // Foreign key

        [ForeignKey("User")]
        public int UserId { get; set; } // Foreign key
    }
}
