﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Teamo_API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.10");

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

                    b.HasIndex("ProjectId");

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

                    b.Property<int>("AuthorId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AssignmentId");

                    b.HasIndex("AuthorId");

                    b.ToTable("Comments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AssignmentId = 1,
                            AuthorId = 1,
                            CreatedAt = new DateTime(2023, 9, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very challenging"
                        },
                        new
                        {
                            Id = 2,
                            AssignmentId = 1,
                            AuthorId = 2,
                            CreatedAt = new DateTime(2023, 9, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we need to work hard on this"
                        },
                        new
                        {
                            Id = 3,
                            AssignmentId = 2,
                            AuthorId = 3,
                            CreatedAt = new DateTime(2023, 9, 26, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very fun"
                        },
                        new
                        {
                            Id = 4,
                            AssignmentId = 2,
                            AuthorId = 4,
                            CreatedAt = new DateTime(2023, 9, 27, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we can learn a lot from this"
                        },
                        new
                        {
                            Id = 5,
                            AssignmentId = 3,
                            AuthorId = 1,
                            CreatedAt = new DateTime(2023, 11, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very interesting"
                        },
                        new
                        {
                            Id = 6,
                            AssignmentId = 3,
                            AuthorId = 2,
                            CreatedAt = new DateTime(2023, 11, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we can use some cool features of the device"
                        },
                        new
                        {
                            Id = 7,
                            AssignmentId = 4,
                            AuthorId = 3,
                            CreatedAt = new DateTime(2023, 12, 21, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "This assignment is very creative"
                        },
                        new
                        {
                            Id = 8,
                            AssignmentId = 4,
                            AuthorId = 4,
                            CreatedAt = new DateTime(2023, 12, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Text = "I agree, we can make a fun game with Unity"
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

            modelBuilder.Entity("Persistence.Assignment", b =>
                {
                    b.HasOne("Persistence.Project", "Project")
                        .WithMany("Assignments")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");
                });

            modelBuilder.Entity("Persistence.Comment", b =>
                {
                    b.HasOne("Persistence.Assignment", "Assignment")
                        .WithMany("Comments")
                        .HasForeignKey("AssignmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Persistence.User", "Author")
                        .WithMany("Comments")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Assignment");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Persistence.Assignment", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Persistence.Project", b =>
                {
                    b.Navigation("Assignments");
                });

            modelBuilder.Entity("Persistence.User", b =>
                {
                    b.Navigation("Comments");
                });
#pragma warning restore 612, 618
        }
    }
}
