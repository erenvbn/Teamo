using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository.IRepository
{
    public interface IProjectRepository:IRepository<Project>
    {
        Task<List<Project>> GetAllAsync(Expression<Func<Project,bool>> filter = null);
        Task<Project> GetAsync(Expression<Func<Project,bool>> filter = null, bool tracked= true);
        Task CreateAsync(Project entity);
        Task UpdateAsync(Project entity);
        Task RemoveAsync(int id);
        Task SaveAsync();
    }
}
