﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TestDoServer.DAL;

namespace TestDoServer.Migrations
{
    [DbContext(typeof(TestDoContext))]
    partial class TestDoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("TestDoServer.DAL.Models.ToDoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Complete");

                    b.Property<string>("Name");

                    b.Property<int>("ToDoListId");

                    b.HasKey("Id");

                    b.HasIndex("ToDoListId");

                    b.ToTable("ToDoItem");
                });

            modelBuilder.Entity("TestDoServer.DAL.Models.ToDoList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Owner");

                    b.Property<int>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("ToDoList");
                });

            modelBuilder.Entity("TestDoServer.Models.ToDoProject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Owner");

                    b.HasKey("Id");

                    b.ToTable("ToDoProject");
                });

            modelBuilder.Entity("TestDoServer.DAL.Models.ToDoItem", b =>
                {
                    b.HasOne("TestDoServer.DAL.Models.ToDoList", "ToDoList")
                        .WithMany("Items")
                        .HasForeignKey("ToDoListId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TestDoServer.DAL.Models.ToDoList", b =>
                {
                    b.HasOne("TestDoServer.Models.ToDoProject", "Project")
                        .WithMany("ToDoLists")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
