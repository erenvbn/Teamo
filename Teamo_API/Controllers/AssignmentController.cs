using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Teamo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : BaseAPIController
    {
        //Dependency injection for DataContext
        private readonly DataContext _dataContext;
        public AssignmentController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Assignment>>> GetAssignments()
        {
            return await _dataContext.Assignments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Assignment>> FindAssignment(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            else
            {
                return await _dataContext.Assignments.FindAsync(id);
            }
        }

        //[HttpPost]
        //public async Task<>
    }
}
