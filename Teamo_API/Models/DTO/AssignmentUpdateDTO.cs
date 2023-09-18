namespace Teamo_API.Models.DTO
{
    public class AssignmentUpdateDTO
    {
        public string OperationType { get; set; }
        public AssignmentDTO AssignmentDTO { get; set; }
        public List<int> UserIds { get; set; }
        public List<int> CommentIds { get; set; }
    }
}
