using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using Persistence.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository
{
    public class AssignmentUserRepository : IAssignmentUserRepository
    {
        private readonly DataContext _dataContext;
        public AssignmentUserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task CreateAsync(AssignmentUser entity)
        {
            await _dataContext.AssignmentUsers.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<AssignmentUser> GetAsync(Expression<Func<AssignmentUser, bool>> filter = null, bool tracked = true)
        {
            IQueryable<AssignmentUser> query = _dataContext.AssignmentUsers;
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

        public async Task<List<AssignmentUser>> GetAllAsync(Expression<Func<AssignmentUser, bool>> filter = null)
        {
            IQueryable<AssignmentUser> query = _dataContext.AssignmentUsers;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task RemoveAsync(int id)
        {
            var assignmentUser = _dataContext.AssignmentUsers.Find(id);
            _dataContext.AssignmentUsers.Remove(assignmentUser);
            await SaveAsync();
        }

        public async Task RemoveAllAsync(int deletedAssignmentId)
        {
            var assignmentUserstoDelete = _dataContext.AssignmentUsers
                .Where(au => au.AssignmentId == deletedAssignmentId).ToList();

            _dataContext.AssignmentUsers.RemoveRange(assignmentUserstoDelete);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(AssignmentUser entity)
        {
            _dataContext.AssignmentUsers.Update(entity);
            await SaveAsync();
        }
    }
}
