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
                },

                new User
                {
                    Id = 3,
                    Name = "Bengü",
                    Email = "bengüvbn@gmail.com",
                    Password = "bengübengü"
                },

                new User
                {
                    Id = 4,
                    Name = "Mehmet",
                    Email = "mehmetvbn@gmail.com",
                    Password = "mehmetmehmet"
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
                    EndDate = new DateTime(2023, 11, 1) },

                new Project
                {
                    Id = 3,
                    Name = "Mobile project",
                    Description = "A project to create a mobile app using Xamarin and Azure",
                    StartDate = new DateTime(2023, 11, 1),
                    EndDate = new DateTime(2023, 12, 1)
                },

                new Project
                {
                    Id = 4,
                    Name = "Game project",
                    Description = "A project to make a simple game using Unity and C#",
                    StartDate = new DateTime(2023, 12, 1),
                    EndDate = new DateTime(2024, 1, 1)
                }
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
                },
                 new Assignment
                 {
                     Id = 3,
                     Title = "Mobile development",
                     Description = "Create a simple app that uses the camera and GPS features of the device",
                     DueDate = new DateTime(2023, 11, 20),
                     Priority = 4,
                     Status = 0,
                     ProjectId = 3
                 },
                 new Assignment
                 {
                     Id = 4,
                     Title = "Game development",
                     Description = "Make a game that has basic physics and collision detection",
                     DueDate = new DateTime(2023, 12, 20),
                     Priority = 5,
                     Status = 0,
                     ProjectId = 4
                 },
                  new Assignment
                  {
                      Id = 5,
                      Title = "Database implementation",
                      Description = "Write SQL queries to create tables and insert data for the database design",
                      DueDate = new DateTime(2023, 9, 30),
                      Priority = 4,
                      Status = 0,
                      ProjectId = 1
                  },
                   new Assignment
                   {
                       Id = 6,
                       Title = "Web design",
                       Description = "Create a responsive and user-friendly UI for the web application using HTML, CSS and Bootstrap",
                       DueDate = new DateTime(2023, 10, 10),
                       Priority = 4,
                       Status = 0,
                       ProjectId = 2
                   },
                    new Assignment
                    {
                        Id = 7,
                        Title = "Mobile design",
                        Description = "Create a native and intuitive UI for the mobile app using Xamarin Forms",
                        DueDate = new DateTime(2023, 11, 30),
                        Priority = 4,
                        Status = 0,
                        ProjectId = 3
                    },
                     new Assignment
                     {
                         Id = 8,
                         Title = "Game design",
                         Description = "Create a storyboard and a prototype for the game using Unity tools",
                         DueDate = new DateTime(2023, 12, 30),
                         Priority = 4,
                         Status = 0,
                         ProjectId = 4
                     }
            );

            // SEED DATA FOR COMMENT
            modelBuilder.Entity<Comment>().HasData(
                new Comment
                {
                    Id = 1,
                    Text = "This assignment is very challenging",
                    CreatedAt = new DateTime(2023, 9, 21),
                    AssignmentId = 1,
                    AuthorId = 1
                },

                new Comment
                {
                    Id = 2,
                    Text = "I agree, we need to work hard on this",
                    CreatedAt = new DateTime(2023, 9, 22),
                    AssignmentId = 1,
                    AuthorId = 2
                },

                new Comment
                {
                    Id = 3,
                    Text = "This assignment is very fun",
                    CreatedAt = new DateTime(2023, 9, 26),
                    AssignmentId = 2,
                    AuthorId = 3
                },

                new Comment
                {
                    Id = 4,
                    Text = "I agree, we can learn a lot from this",
                    CreatedAt = new DateTime(2023, 9, 27),
                    AssignmentId = 2,
                    AuthorId = 4
                },

                new Comment
                {
                    Id = 5,
                    Text = "This assignment is very interesting",
                    CreatedAt = new DateTime(2023, 11, 21),
                    AssignmentId = 3,
                    AuthorId = 1
                },

                 new Comment
                 {
                     Id = 6,
                     Text = "I agree, we can use some cool features of the device",
                     CreatedAt = new DateTime(2023, 11, 22),
                     AssignmentId = 3,
                     AuthorId = 2
                 },

                  new Comment
                  {
                      Id = 7,
                      Text = "This assignment is very creative",
                      CreatedAt = new DateTime(2023, 12, 21),
                      AssignmentId = 4,
                      AuthorId = 3
                  },

                   new Comment
                   {
                       Id = 8,
                       Text = "I agree, we can make a fun game with Unity",
                       CreatedAt = new DateTime(2023, 12, 22),
                       AssignmentId = 4,
                       AuthorId = 4
                   }
            );
        }
    }
}
