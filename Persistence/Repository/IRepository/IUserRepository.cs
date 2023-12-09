using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Teamo_DataAccess.Models;

namespace Persistence.Repository.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<List<User>> GetAllAsync(Expression<Func<User, bool>> filter = null);
        Task<User> GetAsync(Expression<Func<User, bool>> filter = null, bool tracked = true);
        Task CreateAsync(User entity);
        Task UpdateAsync(User entity);
        Task RemoveAsync(int id);
        Task SaveAsync();
        bool IsUniqueUser(string userName);
        Task<LoginResponse> Login(LoginRequest loginRequest);
        Task<User> Register(RegistrationRequest registrationRequestDTO);
    }
}
