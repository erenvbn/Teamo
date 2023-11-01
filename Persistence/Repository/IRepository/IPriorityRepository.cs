using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository.IRepository
{
    public interface IPriorityRepository:IRepository<Priority>
    {
        Task<List<Priority>> GetAllAsync(Expression<Func<Priority,bool>> filter = null);
        Task<Priority> GetAsync(Expression<Func<Priority,bool>> filter = null, bool tracked= true);
        Task CreateAsync(Priority entity);
        Task UpdateAsync(Priority entity);
        Task RemoveAsync(int id);
        Task SaveAsync();
    }
}
