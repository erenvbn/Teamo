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
    public class AssignmentRepository : IAssignmentRepository
    {
        private readonly DataContext _dataContext;
        public AssignmentRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task CreateAsync(Assignment entity)
        {
            await _dataContext.Assignments.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<Assignment> GetAsync(Expression<Func<Assignment, bool>> filter = null, bool tracked = true)
        {
            IQueryable<Assignment> query = _dataContext.Assignments;
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

        public async Task<List<Assignment>> GetAllAsync(Expression<Func<Assignment, bool>> filter = null)
        {
            IQueryable<Assignment> query = _dataContext.Assignments;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task RemoveAsync(int id)
        {
            var assignment = _dataContext.Assignments.Find(id);
            _dataContext.Assignments.Remove(assignment);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Assignment entity)
        {
            _dataContext.Assignments.Update(entity);
            await SaveAsync();
        }
    }
}
