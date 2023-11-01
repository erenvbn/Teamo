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
    public class PriorityRepository : IPriorityRepository
    {
        private readonly DataContext _dataContext;
        public PriorityRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task CreateAsync(Priority entity)
        {
            await _dataContext.Priorities.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<Priority> GetAsync(Expression<Func<Priority, bool>> filter = null, bool tracked = true)
        {
            IQueryable<Priority> query = _dataContext.Priorities;
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

        public async Task<List<Priority>> GetAllAsync(Expression<Func<Priority, bool>> filter = null)
        {
            IQueryable<Priority> query = _dataContext.Priorities;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task RemoveAsync(int id)
        {
            var priority = _dataContext.Priorities.Find(id);
            _dataContext.Priorities.Remove(priority);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Priority entity)
        {
            _dataContext.Priorities.Update(entity);
            await SaveAsync();
        }
    }
}
