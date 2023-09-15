using Microsoft.EntityFrameworkCore;
using Persistence.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _dataContext;
        public ProjectRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task CreateAsync(Project entity)
        {
            await _dataContext.Projects.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<Project> GetAsync(Expression<Func<Project, bool>> filter = null, bool tracked = true)
        {
            IQueryable<Project> query = _dataContext.Projects;
            if (!tracked)
            {
                query = query.AsNoTracking();
            }
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<Project>> GetAllAsync(Expression<Func<Project, bool>> filter = null)
        {
            IQueryable<Project> query = _dataContext.Projects;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task RemoveAsync(int id)
        {
            var project = _dataContext.Projects.Find(id);
            _dataContext.Projects.Remove(project);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Project entity)
        {
            _dataContext.Projects.Update(entity);
            await SaveAsync();
        }
    }
}
