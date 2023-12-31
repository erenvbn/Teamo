﻿using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using Teamo_DataAccess.Models;

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
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<AssignmentUser> AssignmentUsers { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<AppCredentials> AppCredentials { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<UserRoles>().HasData(
                new UserRoles
                {
                    Id = 1,
                    UserRoleTitle = "Admin",
                },
                new UserRoles
                {
                    Id = 2,
                    UserRoleTitle = "User",
                }
                );
            //Data for AppCredentials
            modelBuilder.Entity<AppCredentials>().HasData(
                new AppCredentials
                {
                    Id = 1,
                    AppName = "TeamO",
                    AppDescription = "A Team Management App",
                    AppContactMail = "teamo@teamo.com",
                    AppContactPhone = "000022228888"
                }
                );

            // Seed data for User
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Eren Guney",
                    UserName = "erguney",
                    Email = "erenvbn@gmail.com",
                    Password = "ereneren",
                    UserRole = 1,
                },

                new User
                {
                    Id = 2,
                    Name = "Emre Guney",
                    UserName = "emguney",
                    Email = "emrevbn@gmail.com",
                    Password = "emreemre",
                    UserRole = 2,
                },

                new User
                {
                    Id = 3,
                    Name = "Bengu Atici",
                    UserName = "batici",
                    Email = "benguvbn@gmail.com",
                    Password = "bengübengü",
                    UserRole = 2,

                },

                new User
                {
                    Id = 4,
                    Name = "Mehmet Ozguvenen",
                    UserName = "mehmeto",
                    Email = "mehmetvbn@gmail.com",
                    Password = "mehmetmehmet",
                    UserRole = 2,
                }

            );

            // Seed data for Project
            modelBuilder.Entity<Project>().HasData(
                new Project
                {
                    Id = 1,
                    Name = "Database project",
                    Description = "A project to design and implement a database system",
                    StartDate = new DateTime(2023, 9, 1),
                    EndDate = new DateTime(2023, 10, 1)
                },

                new Project
                {
                    Id = 2,
                    Name = "Web project",
                    Description = "A project to develop a web application using ASP.NET Core and Entity Framework",
                    StartDate = new DateTime(2023, 10, 1),
                    EndDate = new DateTime(2023, 11, 1)
                },

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
                new Assignment
                {
                    Id = 1,
                    Title = "Database design",
                    Description = "Create an ER diagram and a relational schema for a given scenario",
                    StartDate = new DateTime(2023, 9, 10),
                    DueDate = new DateTime(2023, 9, 20),
                    Priority = 4,
                    Status = 2,
                    ProjectId = 1
                },
                new Assignment
                {
                    Id = 2,
                    Title = "Web development",
                    Description = "Implement a CRUD application using ASP.NET Core and Entity Framework",
                    StartDate = new DateTime(2023, 9, 20),
                    DueDate = new DateTime(2023, 9, 25),
                    Priority = 5,
                    Status = 3,
                    ProjectId = 2
                },
                 new Assignment
                 {
                     Id = 3,
                     Title = "Mobile development",
                     Description = "Create a simple app that uses the camera and GPS features of the device",
                     StartDate = new DateTime(2023, 10, 10),
                     DueDate = new DateTime(2023, 11, 20),
                     Priority = 4,
                     Status = 1,
                     ProjectId = 3
                 },
                 new Assignment
                 {
                     Id = 4,
                     Title = "Game development",
                     Description = "Make a game that has basic physics and collision detection",
                     StartDate = new DateTime(2023, 10, 10),
                     DueDate = new DateTime(2023, 12, 20),
                     Priority = 5,
                     Status = 2,
                     ProjectId = 4
                 },
                  new Assignment
                  {
                      Id = 5,
                      Title = "Database implementation",
                      Description = "Write SQL queries to create tables and insert data for the database design",
                      StartDate = new DateTime(2023, 8, 20),
                      DueDate = new DateTime(2023, 9, 30),
                      Priority = 4,
                      Status = 4,
                      ProjectId = 1
                  },
                   new Assignment
                   {
                       Id = 6,
                       Title = "Web design",
                       Description = "Create a responsive and user-friendly UI for the web application using HTML, CSS and Bootstrap",
                       StartDate = new DateTime(2023, 10, 5),
                       DueDate = new DateTime(2023, 10, 10),
                       Priority = 4,
                       Status = 1,
                       ProjectId = 2
                   },
                    new Assignment
                    {
                        Id = 7,
                        Title = "Mobile design",
                        Description = "Create a native and intuitive UI for the mobile app using Xamarin Forms",
                        StartDate = new DateTime(2023, 10, 20),
                        DueDate = new DateTime(2023, 11, 30),
                        Priority = 4,
                        Status = 3,
                        ProjectId = 3
                    },
                     new Assignment
                     {
                         Id = 8,
                         Title = "Game design",
                         Description = "Create a storyboard and a prototype for the game using Unity tools",
                         StartDate = new DateTime(2023, 12, 10),
                         DueDate = new DateTime(2023, 12, 30),
                         Priority = 4,
                         Status = 2,
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
                    UserId = 1
                },

                new Comment
                {
                    Id = 2,
                    Text = "I agree, we need to work hard on this",
                    CreatedAt = new DateTime(2023, 9, 22),
                    AssignmentId = 1,
                    UserId = 2
                },

                new Comment
                {
                    Id = 3,
                    Text = "This assignment is very fun",
                    CreatedAt = new DateTime(2023, 9, 26),
                    AssignmentId = 2,
                    UserId = 3
                },

                new Comment
                {
                    Id = 4,
                    Text = "I agree, we can learn a lot from this",
                    CreatedAt = new DateTime(2023, 9, 27),
                    AssignmentId = 2,
                    UserId = 4
                },

                new Comment
                {
                    Id = 5,
                    Text = "This assignment is very interesting",
                    CreatedAt = new DateTime(2023, 11, 21),
                    AssignmentId = 3,
                    UserId = 1
                },

                 new Comment
                 {
                     Id = 6,
                     Text = "I agree, we can use some cool features of the device",
                     CreatedAt = new DateTime(2023, 11, 22),
                     AssignmentId = 3,
                     UserId = 2
                 },

                  new Comment
                  {
                      Id = 7,
                      Text = "This assignment is very creative",
                      CreatedAt = new DateTime(2023, 12, 21),
                      AssignmentId = 4,
                      UserId = 3
                  },

                   new Comment
                   {
                       Id = 8,
                       Text = "I agree, we can make a fun game with Unity",
                       CreatedAt = new DateTime(2023, 12, 22),
                       AssignmentId = 4,
                       UserId = 4
                   }
            );

            // SEED DATA FOR AssignmentUser
            modelBuilder.Entity<AssignmentUser>().HasData(
                // Users assigned to Assignment with Id 1 (Database design)
                new AssignmentUser { Id = 1, AssignmentId = 1, UserId = 1 }, // Eren is assigned
                new AssignmentUser { Id = 2, AssignmentId = 1, UserId = 2 }, // Emre is assigned

                // Users assigned to Assignment with Id 2 (Web development)
                new AssignmentUser { Id = 3, AssignmentId = 2, UserId = 2 }, // Emre is assigned
                new AssignmentUser { Id = 4, AssignmentId = 2, UserId = 4 }, // Mehmet is assigned

                // Users assigned to Assignment with Id 3 (Mobile development)
                new AssignmentUser { Id = 5, AssignmentId = 3, UserId = 1 }, // Eren is assigned
                new AssignmentUser { Id = 6, AssignmentId = 3, UserId = 2 }, // Emre is assigned

                // Users assigned to Assignment with Id 4 (Game development)
                new AssignmentUser { Id = 7, AssignmentId = 4, UserId = 3 }, // Bengü is assigned
                new AssignmentUser { Id = 8, AssignmentId = 4, UserId = 4 },  // Mehmet is assigned

                // Add unassigned assignments to users
                new AssignmentUser { Id = 9, AssignmentId = 5, UserId = 1 },  // Eren is assigned to Assignment 5
                new AssignmentUser { Id = 10, AssignmentId = 6, UserId = 2 }, // Emre is assigned to Assignment 6
                new AssignmentUser { Id = 11, AssignmentId = 7, UserId = 3 }, // Bengü is assigned to Assignment 7
                new AssignmentUser { Id = 12, AssignmentId = 8, UserId = 4 }  // Mehmet is assigned to Assignment 8

            );

            //SEED DATA FOR Priority
            modelBuilder.Entity<Priority>().HasData(
            new Priority { Id = 1, PriorityTitle = "Unknown" },
            new Priority { Id = 2, PriorityTitle = "Low Priority" },
            new Priority { Id = 3, PriorityTitle = "Neutral" },
            new Priority { Id = 4, PriorityTitle = "High Priority" },
            new Priority { Id = 5, PriorityTitle = "Critical" }
            );

            //SEED DATA FOR Status
            modelBuilder.Entity<Status>().HasData(
            new Status { Id = 1, StatusTitle = "Pending" },
            new Status { Id = 2, StatusTitle = "In Process" },
            new Status { Id = 3, StatusTitle = "Completed" },
            new Status { Id = 4, StatusTitle = "Canceled" }
            );
        }
    }
}
