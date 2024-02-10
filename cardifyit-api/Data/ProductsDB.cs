namespace cardifyit_api.Data
{
    public record Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string? ProductUrl { get; set; }
        public string? AddToCardId { get; set; }
    }

    // Define an in-memory data store for products, supporting CRUD operations.
    public class ProductsDB
    {
        private static List<Product> _products = new List<Product>()
        {
            new Product{ Id=1, Name="Example Product", Description="Example Product Description", ImageUrl="", ProductUrl="", AddToCardId="" },
        };

        public static List<Product> GetProducts()
        {
            return _products;
        }

        public static Product? GetProduct(int id)
        {
            return _products.SingleOrDefault(product => product.Id == id);
        }

        public static Product CreateProduct(Product product)
        {
            _products.Add(product);
            return product;
        }

        public static Product UpdateProduct(Product update)
        {
            _products = _products.Select(product =>
            {
                if (product.Id == update.Id)
                {
                    product.Name = update.Name;
                    product.Description = update.Description;
                    product.ImageUrl = update.ImageUrl;
                    product.ProductUrl = update.ProductUrl;
                    product.AddToCardId = update.AddToCardId;
                }
                return product;
            }).ToList();
            return update;
        }

        public static void RemoveProduct(int id)
        {
            _products = _products.FindAll(product => product.Id != id).ToList();
        }
    }
}
