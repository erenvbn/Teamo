using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Persistence;
using Persistence.Repository.IRepository;
using System.ComponentModel.DataAnnotations.Schema;
using Teamo_API.Models.DTO;

namespace Teamo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : BaseAPIController
    {
        //Dependency injection for db
        private readonly IAssignmentRepository _dbAssignment;
        private readonly IProjectRepository _dbProject;
        //Dependency injection for AutoMapper
        private readonly IMapper _mapper;

        public AssignmentController(IAssignmentRepository dbAssignment, IProjectRepository dbProject, IMapper mapper)
        {
            _dbAssignment = dbAssignment;
            _dbProject = dbProject;
            _mapper = mapper;
        }

        [HttpGet(Name ="GetAssignments")]
        public async Task<ActionResult<List<AssignmentDTO>>> GetAssignments()
        {
            IEnumerable<Assignment> assignmentList = await _dbAssignment.GetAllAsync();
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
                return await _dbAssignment.GetAsync(u=> u.Id == id);
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
                if (assignmentDTO == null)
                {
                    return BadRequest();
                }
                else
                {
                    var assignments = await _dbAssignment.GetAllAsync();
                    assignmentDTO.Id = assignments.OrderByDescending(u => u.Id).First().Id + 1;

                    var project = _dbProject.GetAsync(u=>u.Id == assignmentDTO.Id);
                    var assignment = _mapper.Map<Assignment>(assignmentDTO);

                    await _dbAssignment.CreateAsync(assignment);
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
                else if (_dbAssignment.GetAsync(u=> u.Id == id) == null)
                {
                    return NotFound();
                }
                else
                {
                    _dbAssignment.RemoveAsync(id);
                    await _dbAssignment.SaveAsync();
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
                var assignments = await _dbAssignment.GetAllAsync();
                if (!assignments.Any(u => u.Id == id))
                {
                    return NotFound();
                }

                var assignment = await _dbAssignment.GetAsync(u => u.Id == id);
                if (assignment == null)
                {
                    return NotFound();
                }

                _mapper.Map(assignmentDTO, assignment);

                await _dbAssignment.UpdateAsync(assignment);
                await _dbAssignment.SaveAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
