using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository.IRepository
{
    public interface IAssignmentRepository:IRepository<Assignment>
    {
        Task<List<Assignment>> GetAllAsync(Expression<Func<Assignment,bool>> filter = null);
        Task<Assignment> GetAsync(Expression<Func<Assignment,bool>> filter = null, bool tracked= true);
        Task CreateAsync(Assignment entity);
        Task UpdateAsync(Assignment entity);
        Task RemoveAsync(int id);
        Task SaveAsync();
    }
}
