using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Teamo_DataAccess.Models;

namespace Persistence.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        private string secretKey;
        public UserRepository(DataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            //Accessing secret key from appsettings.json/apisettings/Secret
            secretKey = configuration.GetValue<string>("ApiSettings:Secret");
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

        bool IUserRepository.IsUniqueUser(string userName)
        {
            var user = _dataContext.Users.FirstOrDefault(x => x.UserName == userName);
            if (user == null)
            {
                return true;
            }
            return false;
        }

        async Task<LoginResponse> IUserRepository.Login(LoginRequest loginRequest)
        {
            var user = _dataContext.Users
                .FirstOrDefault(u => u.UserName.ToLower() == loginRequest.UserName.ToLower()
                && u.Password == loginRequest.Password);
            if (user == null)
            {
                return new LoginResponse()
                {
                    //Generating final token
                    Token = "",
                    User = user,
                };

            }
            else
            {
                //if user found generate JWT Token
                var tokenHandler = new JwtSecurityTokenHandler();

                //converting secretkey to bytes
                var key = Encoding.ASCII.GetBytes(secretKey);

                var tokenDescriptor = new SecurityTokenDescriptor
                {

                    //Generating signingcredentials for our tokenDescriptor
                    Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.UserRole.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                //Generating token according to token descriptor
                var token = tokenHandler.CreateToken(tokenDescriptor);
                LoginResponse loginResponse = new LoginResponse()
                {
                    //Generating final token
                    Token = tokenHandler.WriteToken(token),
                    User = user,
                };
                return loginResponse;
            }
        }

        async Task<User> IUserRepository.Register(RegistrationRequest registrationRequestDTO)
        {


            User user = new User()
            {
                Id = registrationRequestDTO.Id,
                UserName = registrationRequestDTO.UserName,
                Password = registrationRequestDTO.Password,
                Name = registrationRequestDTO.Name,
                Email = registrationRequestDTO.Email,
                UserRole = registrationRequestDTO.UserRole,

            };

            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
            user.Password = "";
            return user;

        }
    }
}
