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
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task CreateAsync(User entity)
        {
            await _dataContext.Users.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<User> GetAsync(Expression<Func<User, bool>> filter = null, bool tracked = true)
        {
            IQueryable<User> query = _dataContext.Users;
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

        public async Task<List<User>> GetAllAsync(Expression<Func<User, bool>> filter = null)
        {
            IQueryable<User> query = _dataContext.Users;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task RemoveAsync(int id)
        {
            var user = _dataContext.Users.Find(id);
            _dataContext.Users.Remove(user);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(User entity)
        {
            _dataContext.Users.Update(entity);
            await SaveAsync();
        }
    }
}
