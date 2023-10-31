using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TeamO_Identity.Data;
using TeamO_Identity.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cross Origin Policy
builder.Services.AddCors(o => o.AddPolicy("AllowAnyOrigin", builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));



builder.Services.AddAuthentication();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Configure Customize password requirements, lockout settings, etc.
});

builder.Services.AddDbContext<ApplicationUserDbContext>(opt =>
{
    opt.UseSqlite("Data Source=teamOIdentity.db", b => b.MigrationsAssembly("TeamO_Identity"));
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
.AddEntityFrameworkStores<ApplicationUserDbContext>()
.AddDefaultTokenProviders();

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

app.Run();
