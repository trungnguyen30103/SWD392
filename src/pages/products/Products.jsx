import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("ByName");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    const mockProducts = [
      { id: 1, name: "BlindBox1", price: 500, discountPrice: 450, stock: 10, img: "https://via.placeholder.com/150" },
      { id: 2, name: "BlindBox2", price: 200, discountPrice: 200, stock: 5, img: "https://via.placeholder.com/150" },
      { id: 3, name: "BlindBox3", price: 1000, discountPrice: 900, stock: 0, img: "https://via.placeholder.com/150" },
      { id: 4, name: "BlindBox4", price: 750, discountPrice: 700, stock: 7, img: "https://via.placeholder.com/150" },
      { id: 5, name: "BlindBox5", price: 350, discountPrice: 300, stock: 12, img: "https://via.placeholder.com/150" },
      { id: 6, name: "BlindBox6", price: 600, discountPrice: 550, stock: 4, img: "https://via.placeholder.com/150" },
    ];
    setProducts(mockProducts);
  };

  const searchProduct = () => {
    if (searchInput === "") {
      fetchProduct();
      return;
    }
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchInput.toLowerCase()));
    setProducts(filteredProducts);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleProductClick = (id) => {
    navigate(`/productdetail/${id}`);
  };

  const addToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("Product is out of stock.");
      return;
    }
    const isAlreadyInCart = cart.some((item) => item.id === product.id);
    if (isAlreadyInCart) {
      toast.error("Product is already in the cart.");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success("Item added to cart.");
  };

  const handleViewCartClick = () => {
    navigate("/viewcart");
  };

  return (
    <div className="bg-white">
      <ToastContainer />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold text-black mb-8 text-center">Our Latest Products</h2>
        
        {/* Cart Button */}
        <div className="flex justify-end mb-4">
          <button onClick={handleViewCartClick} className="relative">
            <ShoppingCartIcon className="text-blue-600 text-3xl" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-6">
          <select onChange={handleFilterChange} className="border border-gray-300 rounded-md px-2 py-2">
            <option value="ByName">By Name</option>
            <option value="ByProductID">By Product ID</option>
          </select>
          <input type="text" value={searchInput} onChange={handleSearchInputChange} placeholder="Search products..." className="border p-2 rounded-md w-full" />
          <button onClick={searchProduct} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">Search</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img className="w-full h-48 rounded-md object-cover" src={product.img} alt={product.name} />
              <h3 className="mt-4 text-lg font-bold text-gray-900">{product.name}</h3>
              <div className="flex flex-col items-center mt-2">
                {product.price !== product.discountPrice ? (
                  <>
                    <span className="text-gray-400 font-bold text-sm line-through">{product.price.toLocaleString("en-US")} $</span>
                    <span className="text-gray-900 font-bold text-lg">{product.discountPrice.toLocaleString("en-US")} $</span>
                  </>
                ) : (
                  <span className="text-gray-900 font-bold text-lg">{product.price.toLocaleString("en-US")} $</span>
                )}
              </div>
              <div className="flex justify-between w-full mt-4">
                <button onClick={() => addToCart(product)} className="bg-gray-900 text-white py-2 px-4 rounded-md font-bold hover:bg-gray-700">Add to Cart</button>
                <button onClick={() => handleProductClick(product.id)} className="bg-blue-600 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-500">View Detail</button>
              </div>
              {product.stock <= 0 ? (
                <span className="text-gray-400 font-bold mt-2">Out of Stock</span>
              ) : (
                <span className="text-black font-bold mt-2">In Stock: {product.stock}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
