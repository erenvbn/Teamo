using AutoMapper;
using AutoMapper.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Persistence;
using Persistence.Models;
using Persistence.Repository.IRepository;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
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
        private readonly IAssignmentUserRepository _dbAssignmentUser;
        //Dependency injection for AutoMapper
        private readonly IMapper _mapper;


        public AssignmentController(IAssignmentRepository dbAssignment, IProjectRepository dbProject, IAssignmentUserRepository dbAssignmentUser,IMapper mapper)
        {
            _dbAssignment = dbAssignment;
            _dbProject = dbProject;
            _dbAssignmentUser = dbAssignmentUser;

            _mapper = mapper;
        }

        [HttpGet(Name = "GetAssignments")]
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
                return await _dbAssignment.GetAsync(u => u.Id == id);
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
                    var project = _dbProject.GetAsync(u => u.Id == assignmentDTO.Id);
                    var assignment = _mapper.Map<Assignment>(assignmentDTO);

                    await _dbAssignment.CreateAsync(assignment);
                    return CreatedAtRoute("GetAssignments", new { id = assignment.Id }, assignment);
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
        [HttpDelete("api/removeAssignment")]
        public async Task<IActionResult> RemoveAssignment(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                else if (await _dbAssignment.GetAsync(u => u.Id == id) == null)
                {
                    return NotFound();
                }
                else
                {
                    await _dbAssignment.RemoveAsync(id);
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
        [HttpPut("Update/{assignmentId:int}", Name = "UpdateAssignment")]
        //[HttpPut("{id:int}", Name = "UpdateAssignment")]
        public async Task<IActionResult> UpdateAssignment(int assignmentId, [FromBody] AssignmentUpdateDTO assignmentUpdateDTO)
        {
            try
            {
                var assignment = await _dbAssignment.GetAsync(u => u.Id == assignmentId);

                if (assignment == null)
                {
                    return NotFound();
                }
                else
                {
                    var assignmentUsers = await _dbAssignmentUser.GetAllAsync();
                    switch (assignmentUpdateDTO.OperationType)
                    {
                        case "updateAssignment":
                            // Update assignment logic
                            assignment = _mapper.Map(assignmentUpdateDTO.AssignmentDTO, assignment);
                            await _dbAssignment.UpdateAsync(assignment);
                            break;
                        case "addUsers":
                            // Add users to AssignmentUser logic

                            if (assignmentUpdateDTO.UserIds!=null)
                            {

                                for (int i = 0; i < assignmentUpdateDTO.UserIds.Count(); i++)
                                {
                                    var assignmentUser = new AssignmentUser()
                                    {
                                        Id = assignmentUsers.OrderByDescending(u => u.Id).First().Id+1,
                                        AssignmentId = assignmentUpdateDTO.AssignmentDTO.Id,
                                        UserId = assignmentUpdateDTO.UserIds[i]
                                    };

                                    if (!assignmentUsers.Contains(assignmentUser))
                                    {
                                        await _dbAssignmentUser.CreateAsync(assignmentUser);
                                    }
                                    else
                                    {
                                        continue;
                                    }
                                    return NoContent();
                                }
                            }
                            break;
                        case "removeUsers":
                            // Remove users from AssignmentUser logic
                            var deletedIds = assignmentUsers
                                .Where(u => u.AssignmentId == assignmentId && assignmentUpdateDTO.UserIds.Contains(u.UserId))
                                .Select(u => u.Id)
                                .ToList();
                            if (deletedIds!=null)
                            {
                                foreach (var id in deletedIds)
                                {
                                    await _dbAssignmentUser.RemoveAsync(id);
                                }
                                await _dbAssignmentUser.SaveAsync();
                                return NoContent();
                            }
                            break;
                        default:
                            return BadRequest("Invalid operationType.");
                    }
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
