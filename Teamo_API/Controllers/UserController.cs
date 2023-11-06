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
    public class UserController : BaseAPIController
    {
        //Dependency injection for db
        private readonly IAssignmentRepository _dbAssignment;
        private readonly IUserRepository _dbUser;
        //Dependency injection for AutoMapper
        private readonly IMapper _mapper;

        public UserController(IAssignmentRepository dbAssignment, IUserRepository dbUser, IMapper mapper)
        {
            _dbAssignment = dbAssignment;
            _dbUser = dbUser;
            _mapper = mapper;
        }

        [HttpGet(Name ="GetUsers")]
        public async Task<ActionResult<List<UserDTO>>> GetUsers()
        {
            IEnumerable<User> userList = await _dbUser.GetAllAsync();
            return Ok(_mapper.Map<List<UserDTO>>(userList));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> FindUser(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            else
            {
                return await _dbUser.GetAsync(u=> u.Id == id);
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser([FromBody] UserDTO userDTO)
        {
            try
            {
                if (userDTO == null)
                {
                    return BadRequest();
                }
                else
                {
                    var users = await _dbUser.GetAllAsync();
                    userDTO.Id = users.OrderByDescending(u => u.Id).First().Id + 1;

                    var user = _mapper.Map<User>(userDTO);

                    await _dbUser.CreateAsync(user);
                    return CreatedAtRoute("GetUsers", new { id = user.Id }, user);
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
        public async Task<IActionResult> RemoveUser(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                else if (_dbUser.GetAsync(u=> u.Id == id) == null)
                {
                    return NotFound();
                }
                else
                {
                    await _dbUser.RemoveAsync(id);
                    await _dbUser.SaveAsync();
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
        [HttpPut("{id:int}", Name ="UpdateUser")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDTO userDTO)
        {
            try
            {
                var projects = await _dbUser.GetAllAsync();
                if (!projects.Any(u => u.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    var user = await _dbUser.GetAsync(u => u.Id == id);
                    user = _mapper.Map(userDTO, user);
                    await _dbUser.UpdateAsync(user);
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
