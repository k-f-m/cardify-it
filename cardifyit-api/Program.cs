using Microsoft.OpenApi.Models;
using cardifyit_api.Data;
var builder = WebApplication.CreateBuilder(args);

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
   c.SwaggerEndpoint("/swagger/v1/swagger.json", "PizzaStore API V1");
});

app.UseCors(allowSpecificOrigins);

// Add route mappings and invoke CRUD on in-memory storage through routes.
app.MapGet("/cards/{id}", (int id) => ProductsDB.GetProduct(id));
app.MapGet("/cards", () => ProductsDB.GetProducts());
app.MapPost("/cards", (Product card) => ProductsDB.CreateProduct(card));
app.MapPut("/cards", (Product card) => ProductsDB.UpdateProduct(card));
app.MapDelete("/cards/{id}", (int id) => ProductsDB.RemoveProduct(id));

app.Run();