using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository.IRepository
{
    public interface IStatusRepository:IRepository<Status>
    {
        Task<List<Status>> GetAllAsync(Expression<Func<Status,bool>> filter = null);
        Task<Status> GetAsync(Expression<Func<Status,bool>> filter = null, bool tracked= true);
        Task CreateAsync(Status entity);
        Task UpdateAsync(Status entity);
        Task RemoveAsync(int id);
        Task SaveAsync();
    }
}
