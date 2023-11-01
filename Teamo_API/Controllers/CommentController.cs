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
    public class CommentController : BaseAPIController
    {
        //Dependency injection for db
        private readonly IProjectRepository _dbProject;
        private readonly IAssignmentRepository _dbAssignment;
        private readonly IUserRepository _dbUser;
        private readonly ICommentRepository _dbComment;
        //Dependency injection for AutoMapper
        private readonly IMapper _mapper;

        public CommentController(IProjectRepository dbProject, IAssignmentRepository dbAssignment, IUserRepository dbUser, ICommentRepository dbComment, IMapper mapper)
        {
            _dbProject = dbProject;
            _dbAssignment = dbAssignment;
            _dbUser = dbUser;
            _dbComment = dbComment;
            _mapper = mapper;
        }

        [HttpGet(Name = "GetComments")]
        public async Task<ActionResult<List<CommentDTO>>> GetComments()
        {
            IEnumerable<Comment> commentList = await _dbComment.GetAllAsync();
            return Ok(_mapper.Map<List<CommentDTO>>(commentList));
        }

        [HttpGet("FindComment/{id}")]
        public async Task<ActionResult<Comment>> FindComment(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            else
            {
                return await _dbComment.GetAsync(u => u.Id == id);
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        [HttpPost]
        public async Task<ActionResult<CommentDTO>> CreateComment([FromBody] CommentDTO commentDTO)
        {
            try
            {
                if (commentDTO == null)
                {
                    return BadRequest();
                }
                else
                {
                    var comments = await _dbComment.GetAllAsync();
                    commentDTO.Id = comments.OrderByDescending(u => u.Id).First().Id + 1;

                    var comment = _mapper.Map<Comment>(commentDTO);

                    await _dbComment.CreateAsync(comment);
                    return CreatedAtRoute("GetComments", new { id = comment.Id }, comment);
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
        public async Task<IActionResult> RemoveComment(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                else if (_dbUser.GetAsync(u => u.Id == id) == null)
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
        [HttpPut("{id:int}", Name = "UpdateComment")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] CommentDTO commentDTO)
        {
            try
            {
                var comments = await _dbUser.GetAllAsync();
                if (!comments.Any(u => u.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    var comment = await _dbUser.GetAsync(u => u.Id == id);
                    comment = _mapper.Map(commentDTO, comment);
                    await _dbUser.UpdateAsync(comment);
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpGet("projectcomment/{projectId}", Name = "GetProjectComment")]
        public async Task<IActionResult> GetProjectComment(int projectId)
        {
            if (projectId <= 0)
            {
                return BadRequest();

            }
            else
            {
                try
                {
                    List<Comment> projectComments = new List<Comment>();

                    var projects = await _dbProject.GetAllAsync();
                    var assignments = await _dbAssignment.GetAllAsync();
                    var comments = await _dbComment.GetAllAsync();
                    var users = await _dbUser.GetAllAsync();

                    var query = from project in projects

                                where project.Id == projectId

                                join assignment in assignments
                                on project.Id equals assignment.ProjectId

                                join comment in comments
                                on assignment.Id equals comment.AssignmentId

                                join user in users
                                on comment.UserId equals user.Id
                                orderby comment.Id descending

                                select new
                                {
                                    commentId = comment.Id,
                                    assignmentId = assignment.Id,
                                    assignmentName = assignment.Title,
                                    userName = user.Name,
                                    commentText = comment.Text,
                                    commentDate = comment.CreatedAt,

                                };

                    return Ok(query);
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Trace.WriteLine(ex.Message);
                    return StatusCode(500, "Internal Server Error");
                }
            }
        }
    }
}
