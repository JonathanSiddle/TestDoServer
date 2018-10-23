using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using TestDoServer.Controllers;
using TestDoServer.DAL;
using TestDoServer.Models;
using Xunit;

namespace TestDoServerTests
{
    public class ProjectControllerTests : IDisposable
    {
        private TestDoContext context;

        public ProjectControllerTests()
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

             var options = new DbContextOptionsBuilder<TestDoContext>()
                .UseInMemoryDatabase("TestDo")
                .UseInternalServiceProvider(serviceProvider)
                .Options;
            context = new TestDoContext(options);

            context.Database.EnsureCreated();
        }

        public void Dispose()
        {
            context.Database.EnsureDeleted();
            context.Dispose();        
        }

        [Fact]
        public void TestProjectController1()
        {
            SeedDatabase(context);
            var controller = new ProjectController(context);
            var result = controller.Get();
             
            var content = result.Value;
            Assert.True(content.Count == 3);
        }


        private void SeedDatabase(TestDoContext context)
        {
            var projects = new []
            {
                new ToDoProject { Id = 1, Name = "TestProject1", Owner= "Jon" },
                new ToDoProject { Id = 2, Name = "TestProject1", Owner= "Jon" },
                new ToDoProject { Id = 3, Name = "TestProject1", Owner= "Jon" }
            };

            context.ToDoProject.AddRange(projects);
            context.SaveChanges();
        }
    }
}
