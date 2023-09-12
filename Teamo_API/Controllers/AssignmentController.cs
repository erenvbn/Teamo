using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Persistence;
using System.ComponentModel.DataAnnotations.Schema;
using Teamo_API.Models.DTO;

namespace Teamo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : BaseAPIController
    {
        //Dependency injection for DataContext
        private readonly DataContext _dataContext;

        //Dependency injection for AutoMapper
        private readonly IMapper _mapper;
        public AssignmentController(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [HttpGet(Name ="GetAssignments")]
        public async Task<ActionResult<List<AssignmentDTO>>> GetAssignments()
        {
            IEnumerable<Assignment> assignmentList = await _dataContext.Assignments.ToListAsync();
            return Ok(_mapper.Map<List<AssignmentDTO>>(assignmentList));
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

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        [HttpPost]
        public async Task<ActionResult<AssignmentDTO>> CreateAssignment([FromBody] AssignmentDTO assignmentDTO)
        {
            try
            {
                if(assignmentDTO == null)
                {
                    return BadRequest();
                }
                else
                {
                    assignmentDTO.Id = _dataContext.Assignments.OrderByDescending(u => u.Id).First().Id+1;

                    var project = new Project();
                    project = _dataContext.Projects.Find(assignmentDTO.ProjectId);
                    var assignment = _mapper.Map<Assignment>(assignmentDTO);

                    await _dataContext.Assignments.AddAsync(assignment);
                    await _dataContext.SaveChangesAsync();
                    return CreatedAtRoute("GetAssignments", new { id = assignmentDTO.Id }, assignmentDTO);
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete]
        public async Task<IActionResult> RemoveAssignment(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                else if (!_dataContext.Assignments.Any(u => u.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    var assignment = _dataContext.Assignments.Find(id);
                    _dataContext.Remove(assignment);
                    await _dataContext.SaveChangesAsync();
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }

        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut("{id:int}", Name ="UpdateAssignment")]
        public async Task<IActionResult> UpdateAssignment(int id, [FromBody] AssignmentDTO assignmentDTO)
        {
            try
            {
                if (id<=0)
                {
                    return BadRequest();
                }
                else if (!_dataContext.Assignments.Any(u => u.Id == id))
                {
                    return NotFound();
                }
                else
                {

                    var assignment = _dataContext.Assignments.Find(id);
                    assignment = _mapper.Map<Assignment>(assignmentDTO);

                    _dataContext.Assignments.Update(assignment);
                    await _dataContext.SaveChangesAsync();
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
