import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import "./product.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search by name
  const navigate = useNavigate();

  // Pseudo products for testing
  const pseudoProducts = [
    {
      id: 1,
      name: "BlindBox1",
      price: 500,
      discountPrice: 450,
      stock: 10,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "BlindBox2",
      price: 200,
      discountPrice: 200,
      stock: 5,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "BlindBox3",
      price: 1000,
      discountPrice: 900,
      stock: 0,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "BlindBox4",
      price: 750,
      discountPrice: 700,
      stock: 7,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "BlindBox5",
      price: 350,
      discountPrice: 300,
      stock: 12,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "BlindBox6",
      price: 600,
      discountPrice: 550,
      stock: 4,
      img: "https://via.placeholder.com/150",
    },
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Using pseudo products for testing.");
        setProducts(pseudoProducts); // Fallback to pseudo products
      }
    };
    fetchProducts();
  }, []);

  // Add to Cart Function
  const addToCart = async (product) => {
    if (product.stock <= 0) {
      toast.error("Product is out of stock.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/cart", {
        productId: product.id,
        quantity: 1,
      });
      setCart([...cart, response.data]);
      toast.success("Item added to cart.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  // View Product Details Function
  const handleProductClick = (id) => {
    navigate(`/productdetail/${id}`);
  };

  // View Cart Function
  const handleViewCartClick = () => {
    navigate("/cart");
  };

  // Handle Search Input Change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle Search Type Change
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  // Search Products
  const searchProducts = () => {
    if (searchInput === "") {
      setProducts(pseudoProducts); // Reset to all products if search is empty
      return;
    }

    const filteredProducts = products.filter((product) => {
      if (searchType === "name") {
        return product.name.toLowerCase().includes(searchInput.toLowerCase());
      } else if (searchType === "id") {
        return product.id.toString() === searchInput;
      }
      return true;
    });

    setProducts(filteredProducts);
  };

  return (
    <div className="product-list-container">
      <ToastContainer />
      <div className="header">
        <h1>Our Products</h1>
        <button className="cart-button" onClick={handleViewCartClick}>
          <ShoppingCartIcon className="cart-icon" />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="search-type-dropdown"
        >
          <option value="name">Search by Name</option>
          <option value="id">Search by ID</option>
        </select>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder={`Search by ${searchType === "name" ? "name" : "ID"}...`}
          className="search-input"
        />
        <button onClick={searchProducts} className="search-button">
          Search
        </button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>

            {/* Price */}
            <div className="price-container">
              {product.price !== product.discountPrice ? (
                <>
                  <span className="original-price">${product.price}</span>
                  <span className="discounted-price">
                    ${product.discountPrice}
                  </span>
                </>
              ) : (
                <span className="discounted-price">${product.price}</span>
              )}
            </div>

            {/* Stock Status */}
            {product.stock <= 0 ? (
              <p className="out-of-stock">Out of Stock</p>
            ) : (
              <p className="in-stock">In Stock: {product.stock}</p>
            )}

            {/* Buttons */}
            <div className="button-container">
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="details-button"
                onClick={() => handleProductClick(product.id)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;