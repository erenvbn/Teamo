using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Repository;
using Persistence.Repository.IRepository;
using Teamo_API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddScoped<IAssignmentRepository, AssignmentRepository>();
builder.Services.AddScoped<IAssignmentUserRepository, AssignmentUserRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();


builder.Services.AddAutoMapper(typeof(MappingConfig));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddSwaggerGen(c =>
//{
//    // other configurations
//    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
//});

//Cross Origin Policy
builder.Services.AddCors(o => o.AddPolicy("AllowAnyOrigin", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));


builder.Services.AddDbContext<DataContext>(opt =>
{
    //opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    opt.UseSqlite("Data Source=teamo.db", b => b.MigrationsAssembly("Teamo_API"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAnyOrigin");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

app.Run();
