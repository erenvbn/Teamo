using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Persistence;
using Persistence.Models;
using Persistence.Repository.IRepository;
using System.ComponentModel.DataAnnotations.Schema;
using Teamo_API.Models.DTO;

namespace Teamo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentUserController : BaseAPIController
    {
        //Dependency injection for db
        private readonly IAssignmentRepository _dbAssignment;
        private readonly IAssignmentUserRepository _dbAssignmentUser;
        private readonly IUserRepository _dbUser;
        //Dependency injection for AutoMapper
        private readonly IMapper _mapper;

        public AssignmentUserController(IAssignmentRepository dbAssignment, IUserRepository dbUser, IAssignmentUserRepository dbAssignmentUser, IMapper mapper)
        {
            _dbAssignment = dbAssignment;
            _dbUser = dbUser;
            _dbAssignmentUser = dbAssignmentUser;
            _mapper = mapper;

        }

        [HttpGet(Name ="GetAssignmentUsers")]
        public async Task<ActionResult<List<AssignmentUserDTO>>> GetAssignmentUsers()
        {
            IEnumerable<AssignmentUser> assignmentUserList = await _dbAssignmentUser.GetAllAsync();
            return Ok(_mapper.Map<List<AssignmentUserDTO>>(assignmentUserList));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AssignmentUser>> FindProject(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            else
            {
                return await _dbAssignmentUser.GetAsync(u=> u.Id == id);
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        [HttpPost]
        public async Task<ActionResult<AssignmentUserDTO>> CreateAssignmentUser([FromBody] AssignmentUserDTO assignmentUserDTO)
        {
            try
            {
                if (assignmentUserDTO == null)
                {
                    return BadRequest();
                }
                else
                {
                    var assignmentUsers = await _dbAssignmentUser.GetAllAsync();
                    assignmentUserDTO.Id = assignmentUsers.OrderByDescending(u => u.Id).First().Id + 1;

                    var assignmentUser = _mapper.Map<User>(assignmentUserDTO);

                    await _dbUser.CreateAsync(assignmentUser);
                    return CreatedAtRoute("GetAssignmentUsers", new { id = assignmentUser.Id }, assignmentUser);
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
        public async Task<IActionResult> RemoveAssignmentUser(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                else if (_dbAssignmentUser.GetAsync(u=> u.Id == id) == null)
                {
                    return NotFound();
                }
                else
                {
                    await _dbAssignmentUser.RemoveAsync(id);
                    await _dbAssignmentUser.SaveAsync();
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
        [HttpPut("{id:int}", Name ="UpdateAssignmentUser")]
        public async Task<IActionResult> UpdateAssignmentUser(int id, [FromBody] AssignmentUserDTO assignmentUserDTO)
        {
            try
            {
                var projects = await _dbAssignmentUser.GetAllAsync();
                if (!projects.Any(u => u.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    var assignmentUser = await _dbUser.GetAsync(u => u.Id == id);
                    assignmentUser = _mapper.Map(assignmentUserDTO, assignmentUser);
                    await _dbUser.UpdateAsync(assignmentUser);
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
