﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Teamo_API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20231101081535_AddingPriorityandStatusTables")]
    partial class AddingPriorityandStatusTables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.13");

            modelBuilder.Entity("Persistence.Assignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("Priority")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Assignments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Create an ER diagram and a relational schema for a given scenario",
                            DueDate = new DateTime(2023, 9, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 4,
                            ProjectId = 1,
                            Status = 0,
                            Title = "Database design"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Implement a CRUD application using ASP.NET Core and Entity Framework",
                            DueDate = new DateTime(2023, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 5,
                            ProjectId = 2,
                            Status = 0,
                            Title = "Web development"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Create a simple app that uses the camera and GPS features of the device",
                            DueDate = new DateTime(2023, 11, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 4,
                            ProjectId = 3,
                            Status = 0,
                            Title = "Mobile development"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Make a game that has basic physics and collision detection",
                            DueDate = new DateTime(2023, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 5,
                            ProjectId = 4,
                            Status = 0,
                            Title = "Game development"
                        },
                        new
                        {
                            Id = 5,
                            Description = "Write SQL queries to create tables and insert data for the database design",
                            DueDate = new DateTime(2023, 9, 30, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 4,
                            ProjectId = 1,
                            Status = 0,
                            Title = "Database implementation"
                        },
                        new
                        {
                            Id = 6,
                            Description = "Create a responsive and user-friendly UI for the web application using HTML, CSS and Bootstrap",
                            DueDate = new DateTime(2023, 10, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 4,
                            ProjectId = 2,
                            Status = 0,
                            Title = "Web design"
                        },
                        new
                        {
                            Id = 7,
                            Description = "Create a native and intuitive UI for the mobile app using Xamarin Forms",
                            DueDate = new DateTime(2023, 11, 30, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 4,
                            ProjectId = 3,
                            Status = 0,
                            Title = "Mobile design"
                        },
                        new
                        {
                            Id = 8,
                            Description = "Create a storyboard and a prototype for the game using Unity tools",
                            DueDate = new DateTime(2023, 12, 30, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Priority = 4,
                            ProjectId = 4,
                            Status = 0,
                            Title = "Game design"
                        });
                });

            modelBuilder.Entity("Persistence.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AssignmentId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Comments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AssignmentId = 1,
                            CreatedAt = new DateTime(2023, 9, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very challenging",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            AssignmentId = 1,
                            CreatedAt = new DateTime(2023, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we need to work hard on this",
                            UserId = 2
                        },
                        new
                        {
                            Id = 3,
                            AssignmentId = 2,
                            CreatedAt = new DateTime(2023, 9, 26, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very fun",
                            UserId = 3
                        },
                        new
                        {
                            Id = 4,
                            AssignmentId = 2,
                            CreatedAt = new DateTime(2023, 9, 27, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we can learn a lot from this",
                            UserId = 4
                        },
                        new
                        {
                            Id = 5,
                            AssignmentId = 3,
                            CreatedAt = new DateTime(2023, 11, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very interesting",
                            UserId = 1
                        },
                        new
                        {
                            Id = 6,
                            AssignmentId = 3,
                            CreatedAt = new DateTime(2023, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we can use some cool features of the device",
                            UserId = 2
                        },
                        new
                        {
                            Id = 7,
                            AssignmentId = 4,
                            CreatedAt = new DateTime(2023, 12, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very creative",
                            UserId = 3
                        },
                        new
                        {
                            Id = 8,
                            AssignmentId = 4,
                            CreatedAt = new DateTime(2023, 12, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we can make a fun game with Unity",
                            UserId = 4
                        });
                });

            modelBuilder.Entity("Persistence.Models.AssignmentUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AssignmentId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("AssignmentUsers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AssignmentId = 1,
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            AssignmentId = 1,
                            UserId = 2
                        },
                        new
                        {
                            Id = 3,
                            AssignmentId = 2,
                            UserId = 2
                        },
                        new
                        {
                            Id = 4,
                            AssignmentId = 2,
                            UserId = 4
                        },
                        new
                        {
                            Id = 5,
                            AssignmentId = 3,
                            UserId = 1
                        },
                        new
                        {
                            Id = 6,
                            AssignmentId = 3,
                            UserId = 2
                        },
                        new
                        {
                            Id = 7,
                            AssignmentId = 4,
                            UserId = 3
                        },
                        new
                        {
                            Id = 8,
                            AssignmentId = 4,
                            UserId = 4
                        });
                });

            modelBuilder.Entity("Persistence.Priority", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("PriorityTitle")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Priorities");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            PriorityTitle = "Unknown"
                        },
                        new
                        {
                            Id = 2,
                            PriorityTitle = "Low Priority"
                        },
                        new
                        {
                            Id = 3,
                            PriorityTitle = "Neutral"
                        },
                        new
                        {
                            Id = 4,
                            PriorityTitle = "High Priority"
                        },
                        new
                        {
                            Id = 5,
                            PriorityTitle = "Critical"
                        });
                });

            modelBuilder.Entity("Persistence.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Projects");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "A project to design and implement a database system",
                            EndDate = new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Database project",
                            StartDate = new DateTime(2023, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 2,
                            Description = "A project to develop a web application using ASP.NET Core and Entity Framework",
                            EndDate = new DateTime(2023, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Web project",
                            StartDate = new DateTime(2023, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 3,
                            Description = "A project to create a mobile app using Xamarin and Azure",
                            EndDate = new DateTime(2023, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Mobile project",
                            StartDate = new DateTime(2023, 11, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 4,
                            Description = "A project to make a simple game using Unity and C#",
                            EndDate = new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Game project",
                            StartDate = new DateTime(2023, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("Persistence.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("StatusTitle")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Statuses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            StatusTitle = "Pending"
                        },
                        new
                        {
                            Id = 2,
                            StatusTitle = "In Process"
                        },
                        new
                        {
                            Id = 3,
                            StatusTitle = "Completed"
                        },
                        new
                        {
                            Id = 4,
                            StatusTitle = "Canceled"
                        });
                });

            modelBuilder.Entity("Persistence.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "erenvbn@gmail.com",
                            Name = "Eren",
                            Password = "ereneren"
                        },
                        new
                        {
                            Id = 2,
                            Email = "emrevbn@gmail.com",
                            Name = "Emre",
                            Password = "emreemre"
                        },
                        new
                        {
                            Id = 3,
                            Email = "bengüvbn@gmail.com",
                            Name = "Bengü",
                            Password = "bengübengü"
                        },
                        new
                        {
                            Id = 4,
                            Email = "mehmetvbn@gmail.com",
                            Name = "Mehmet",
                            Password = "mehmetmehmet"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
