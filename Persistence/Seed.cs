
namespace Persistence
{
    public class Seed
    {
        public static async Task<bool> SeedData(DataContext dataContext)
        {
            if (dataContext.Users.Any() == false)
            {
                var users = new List<User>
                {
                    new User
                    {
                        Id = 1,
                        Name = "Eren",
                        Email="erenvbn@gmail.com",
                        Password="ereneren"
                    }
                };
                await dataContext.Users.AddRangeAsync(users);
                await dataContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }   
    }
}
