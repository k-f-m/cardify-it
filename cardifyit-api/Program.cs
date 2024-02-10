using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using cardifyit_api.Models;
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Products") ?? "Data Source=Products.db";
builder.Services.AddSqlite<ProductsDbContext>(connectionString);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "Cardify It! API", Description = "Turn JSON data into product cards.", Version = "v1" });
});

// Define a unique identifier for CORS policy.
string allowSpecificOrigins = "_allowSpecificOrigins";

// Define allowed domains.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowSpecificOrigins,
      builder =>
      {
          builder.WithOrigins(
            "http://localhost");
      });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
   c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cardify It! API V1");
});

app.UseCors(allowSpecificOrigins);

// Add route mappings and invoke CRUD on SQLight DB through routes.
app.MapGet("/cards", async (ProductsDbContext db) => await db.Products.ToListAsync());

app.MapPost("/cards", async (ProductsDbContext db, Product product) =>
{
    await db.Products.AddAsync(product);
    await db.SaveChangesAsync();
    return Results.Created($"/cards/{product.Id}", product);
});

app.MapGet("/cards/{id}", async (ProductsDbContext db, int id) => await db.Products.FindAsync(id));

app.MapPut("/cards/{id}", async (ProductsDbContext db, Product updateproduct, int id) =>
{
    var product = await db.Products.FindAsync(id);
    if (product is null) return Results.NotFound();
    product.Name = updateproduct.Name;
    product.Description = updateproduct.Description;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/cards/{id}", async (ProductsDbContext db, int id) =>
{
    var product = await db.Products.FindAsync(id);
    if (product is null)
    {
        return Results.NotFound();
    }
    db.Products.Remove(product);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.Run();