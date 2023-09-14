using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository.IRepository
{
    public interface ICommentRepository:IRepository<Comment>
    {
        Task<List<Comment>> GetAllAsync(Expression<Func<Comment,bool>> filter = null);
        Task<Comment> GetAsync(Expression<Func<Comment,bool>> filter = null, bool tracked= true);
        Task CreateAsync(Comment entity);
        Task UpdateAsync(Comment entity);
        Task RemoveAsync(int id);
        Task SaveAsync();
    }
}
