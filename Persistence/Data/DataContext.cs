using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext() { }
        public DataContext(DbContextOptions options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlite("A FALLBACK CONNECTION STRING");
            }
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed data for User
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Eren",
                    Email="erenvbn@gmail.com",
                    Password="ereneren"
                },

                new User
                {
                    Id = 2,
                    Name = "Emre",
                    Email = "emrevbn@gmail.com",
                    Password = "emreemre"
                }
            );

            // Seed data for Project
            modelBuilder.Entity<Project>().HasData(
                new Project { Id = 1, 
                    Name = "Database project", 
                    Description = "A project to design and implement a database system", 
                    StartDate = new DateTime(2023, 9, 1), 
                    EndDate = new DateTime(2023, 10, 1) },

                new Project { Id = 2, 
                    Name = "Web project", 
                    Description = "A project to develop a web application using ASP.NET Core and Entity Framework", 
                    StartDate = new DateTime(2023, 10, 1), 
                    EndDate = new DateTime(2023, 11, 1) }
            );


            // SEED DATA FOR ASSIGNMENT
            modelBuilder.Entity<Assignment>().HasData(
                new Assignment { Id = 1, 
                    Title = "Database design", 
                    Description = "Create an ER diagram and a relational schema for a given scenario", 
                    DueDate = new DateTime(2023, 9, 20), 
                    Priority = 4, 
                    Status = 0,
                    ProjectId = 1
                },
                new Assignment { Id = 2, 
                    Title = "Web development", 
                    Description = "Implement a CRUD application using ASP.NET Core and Entity Framework", 
                    DueDate = new DateTime(2023, 9, 25), 
                    Priority = 5, 
                    Status = 0,
                    ProjectId = 2
                }
            );

            // SEED DATA FOR COMMENT
            modelBuilder.Entity<Comment>().HasData(
                new Comment { Id = 1, 
                    Text = "This assignment is very challenging", 
                    CreatedAt = new DateTime(2023, 9, 21),
                    AssignmentId = 1,
                    AuthorId = 1
                },

                new Comment { Id = 2, 
                    Text = "I agree, we need to work hard on this", 
                    CreatedAt = new DateTime(2023, 9, 22),
                    AssignmentId = 1,
                    AuthorId = 1
                },

                new Comment { Id = 3, 
                    Text = "This assignment is very fun", 
                    CreatedAt = new DateTime(2023, 9, 26),
                    AssignmentId = 2,
                    AuthorId = 2
                },

                new Comment { Id = 4, 
                    Text = "I agree, we can learn a lot from this", 
                    CreatedAt = new DateTime(2023, 9, 27),
                    AssignmentId = 2,
                    AuthorId = 2
                }
            );
        }
    }
}
