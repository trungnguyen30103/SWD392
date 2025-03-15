import React, { useState } from "react";

function AdminProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "BlindBox1",
      price: 500,
      stock: 10,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "BlindBox2",
      price: 200,
      stock: 5,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "BlindBox3",
      price: 1000,
      stock: 0,
      img: "https://via.placeholder.com/150",
    },
  ]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    img: "",
  });

  const handleAddProduct = () => {
    const newProductWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, newProductWithId]);
    alert("Product added successfully.");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert("Product deleted.");
  };

  const handleUpdateProduct = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, price: product.price + 10 } // Sample update
        : product
    );
    setProducts(updatedProducts);
    alert("Product updated.");
  };

  return (
    <div>
      <h1>Admin Product Management</h1>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.img}
          onChange={(e) =>
            setNewProduct({ ...newProduct, img: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleUpdateProduct(product.id)}>
              Update
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductList;
