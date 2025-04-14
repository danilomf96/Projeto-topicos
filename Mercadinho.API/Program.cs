using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(
    options =>
        options.AddPolicy("Acesso Total",
            configs => configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod())
);
var app = builder.Build();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("Acesso Total");
app.Run();
