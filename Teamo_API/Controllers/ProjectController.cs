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
    public class ProjectController : BaseAPIController
    {
        //Dependency injection for db
        private readonly IAssignmentRepository _dbAssignment;
        private readonly IProjectRepository _dbProject;
        //Dependency injection for AutoMapper
        private readonly IMapper _mapper;

        public ProjectController(IAssignmentRepository dbAssignment, IProjectRepository dbProject, IMapper mapper)
        {
            _dbAssignment = dbAssignment;
            _dbProject = dbProject;
            _mapper = mapper;
        }

        [HttpGet(Name ="GetProjects")]
        public async Task<ActionResult<List<ProjectDTO>>> GetProjects()
        {
            IEnumerable<Project> projectList = await _dbProject.GetAllAsync();
            return Ok(_mapper.Map<List<ProjectDTO>>(projectList));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> FindProject(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            else
            {
                return await _dbProject.GetAsync(u=> u.Id == id);
            }
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        [HttpPost]
        public async Task<ActionResult<ProjectDTO>> CreateProject([FromBody] ProjectDTO projectDTO)
        {
            try
            {
                if (projectDTO == null)
                {
                    return BadRequest();
                }
                else
                {
                    var projects = await _dbProject.GetAllAsync();
                    projectDTO.Id = projects.OrderByDescending(u => u.Id).First().Id + 1;

                    var project = _mapper.Map<Project>(projectDTO);

                    await _dbProject.CreateAsync(project);
                    return CreatedAtRoute("GetProjects", new { id = project.Id }, project);
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
        public async Task<IActionResult> RemoveProject(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                else if (_dbProject.GetAsync(u=> u.Id == id) == null)
                {
                    return NotFound();
                }
                else
                {
                    await _dbProject.RemoveAsync(id);
                    await _dbProject.SaveAsync();
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
        [HttpPut("{id:int}", Name ="UpdateProject")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] ProjectDTO projectDTO)
        {
            try
            {
                var projects = await _dbProject.GetAllAsync();
                if (!projects.Any(u => u.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    var project = await _dbProject.GetAsync(u => u.Id == id);
                    project = _mapper.Map(projectDTO, project);
                    await _dbProject.UpdateAsync(project);
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
