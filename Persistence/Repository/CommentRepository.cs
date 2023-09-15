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
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext _dataContext;
        public CommentRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task CreateAsync(Comment entity)
        {
            await _dataContext.Comments.AddAsync(entity);
            await SaveAsync();
        }

        public async Task<Comment> GetAsync(Expression<Func<Comment, bool>> filter = null, bool tracked = true)
        {
            IQueryable<Comment> query = _dataContext.Comments;
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

        public async Task<List<Comment>> GetAllAsync(Expression<Func<Comment, bool>> filter = null)
        {
            IQueryable<Comment> query = _dataContext.Comments;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public async Task RemoveAsync(int id)
        {
            var comment = _dataContext.Comments.Find(id);
            _dataContext.Comments.Remove(comment);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Comment entity)
        {
            _dataContext.Comments.Update(entity);
            await SaveAsync();
        }
    }
}
