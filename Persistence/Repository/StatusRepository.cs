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
    public class StatusRepository : IStatusRepository
    {
        private readonly DataContext _dataContext;
        public StatusRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task CreateAsync(Status entity)
        {
            await _dataContext.Statuses.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<Status> GetAsync(Expression<Func<Status, bool>> filter = null, bool tracked = true)
        {
            IQueryable<Status> query = _dataContext.Statuses;
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

        public async Task<List<Status>> GetAllAsync(Expression<Func<Status, bool>> filter = null)
        {
            IQueryable<Status> query = _dataContext.Statuses;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task RemoveAsync(int id)
        {
            var priority = _dataContext.Statuses.Find(id);
            _dataContext.Statuses.Remove(priority);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Status entity)
        {
            _dataContext.Statuses.Update(entity);
            await SaveAsync();
        }
    }
}
