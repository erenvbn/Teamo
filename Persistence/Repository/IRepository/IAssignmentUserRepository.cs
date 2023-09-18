using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository.IRepository
{
    public interface IAssignmentUserRepository:IRepository<AssignmentUser>
    {
        Task<List<AssignmentUser>> GetAllAsync(Expression<Func<AssignmentUser,bool>> filter = null);
        Task<AssignmentUser> GetAsync(Expression<Func<AssignmentUser,bool>> filter = null, bool tracked= true);
        Task CreateAsync(AssignmentUser entity);
        Task UpdateAsync(AssignmentUser entity);
        Task RemoveAsync(int id);
        Task SaveAsync();
    }
}
