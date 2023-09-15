using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Models
{
    public class AssignmentUser
    {
        public int AssignmentId { get; set; }
        public List<int> UserId { get; set; }
    }
}
