import React, { useState, useEffect } from 'react';
import './Products.scss';
import db from '../../../db/db.json';
import ProductsList from '../../../components/Admin/ProductsList';
import ProductForm from '../../../components/Admin/ProductForm';
import DeleteConfirmation from '../../../components/Admin/DeleteConfirmation';

const Products = () => {
  // Main state
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('newest');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [totalCount, setTotalCount] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  
  // Success/error notification state
  const [notification, setNotification] = useState(null);

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // For demo, use mock or db.json data depending on what's available
        const productsData = db.products || [];
        const categoriesData = db.categories || [];
        
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification({
          type: 'error',
          message: 'Failed to fetch products. Please try again.'
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products whenever dependencies change
  useEffect(() => {
    let result = products;
    
    // Reset pagination when filters change
    if (searchQuery || categoryFilter !== 'all' || sortBy) {
      setCurrentPage(1);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category_id === parseInt(categoryFilter));
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        case 'oldest':
          return new Date(a.created_at || 0) - new Date(b.created_at || 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    
    setFilteredProducts(result);
    setTotalCount(result.length);
  }, [products, searchQuery, categoryFilter, sortBy]);

  // Update displayed products when filtered products or pagination changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, pageSize]);

  // Handle add product button click
  const handleAddProduct = () => {
    setEditProduct(null);
    setIsFormOpen(true);
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsFormOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = (product) => {
    setDeleteProduct(product);
    setIsDeleteOpen(true);
  };

  // Close form modal
  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditProduct(null);
  };

  // Close delete confirmation modal
  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    setDeleteProduct(null);
  };

  // Save product (create or update)
  const handleSaveProduct = (productData) => {
    try {
      // Format the product data according to database structure
      const formattedData = {
        name: productData.name,
        description: productData.description || '',
        imageUrl: productData.image || '', // Map image field to imageUrl
        price: parseFloat(productData.price),
        stock_quantity: parseInt(productData.stock), // Map stock field to stock_quantity
        category_id: parseInt(productData.category), // Convert category to category_id
        // Include additional fields if needed by UI but not required by DB
        featured: productData.featured || false,
        sku: productData.sku || '',
        // These could be stored as metadata or in separate tables in a real app
        weight: productData.weight || null,
        dimensions: productData.dimensions || null
      };

      if (editProduct) {
        // Update existing product
        const updatedProducts = products.map(p => 
          p.id === editProduct.id ? { 
            ...p, 
            ...formattedData,
            updated_at: new Date().toISOString() 
          } : p
        );
        setProducts(updatedProducts);
        
        setNotification({
          type: 'success',
          message: 'Product updated successfully'
        });
      } else {
        // Add new product
        const newProduct = {
          id: Date.now(), // In a real app we'd get ID from the server
          created_at: new Date().toISOString(),
          updated_at: null,
          ...formattedData
        };
        setProducts([...products, newProduct]);
        
        setNotification({
          type: 'success',
          message: 'Product added successfully'
        });
      }
      
      setIsFormOpen(false);
      setEditProduct(null);
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving product:', error);
      setNotification({
        type: 'error',
        message: 'Failed to save product. Please try again.'
      });
    }
  };

  // Handle product deletion
  const handleDeleteProduct = () => {
    try {
      if (deleteProduct) {
        const updatedProducts = products.filter(p => p.id !== deleteProduct.id);
        setProducts(updatedProducts);
        
        setNotification({
          type: 'success',
          message: 'Product deleted successfully'
        });
        
        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
      
      setIsDeleteOpen(false);
      setDeleteProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      setNotification({
        type: 'error',
        message: 'Failed to delete product. Please try again.'
      });
    }
  };

  // Transform categories to match the format expected by form components
  const formattedCategories = categories.map(category => ({
    value: category.id.toString(),
    label: category.name
  }));

  // Handle page change in pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
    // Scroll to top of the products section
    const productsSection = document.querySelector('.products-main-card');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="admin-products">
      {/* Notification toast */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )}
          {notification.type === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      {/* Header section */}
      <div className="products-header">
        <div className="products-title">
          <h1>Products</h1>
          <p className="products-subtitle">Manage your store products</p>
        </div>
        <div className="products-actions">
          <button className="btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Products
          </button>
          <button className="btn-primary" onClick={handleAddProduct}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="products-stats">
        <div className="stat-card">
          <div className="stat-icon blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">Total Products</p>
            <h3 className="stat-value">{products.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">In Stock</p>
            <h3 className="stat-value">
              {products.filter(p => p.stock_quantity > 0).length}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">Categories</p>
            <h3 className="stat-value">
              {categories.length}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-title">Low Stock</p>
            <h3 className="stat-value">
              {products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5).length}
            </h3>
          </div>
        </div>
      </div>

      {/* Main products card */}
      <div className="products-main-card">
        <div className="card-header">
          <div className="filters-row">
            <div className="search-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-filter">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {formattedCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="view-sort-row">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="page-size-dropdown">
              <label>Show:</label>
              <select 
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card-body">
          <ProductsList 
            products={displayedProducts} 
            categories={categories}
            viewMode={viewMode}
            onEdit={handleEditProduct}
            onDelete={handleDeleteClick}
            loading={loading}
            // Pagination props
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
            
          {!loading && filteredProducts.length === 0 && (
            <div className="no-products">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>No products found</p>
              <span>Try changing your search criteria or add new products</span>
              <button className="btn-primary" onClick={handleAddProduct}>
                Add New Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isFormOpen && (
        <ProductForm
          product={editProduct}
          categories={formattedCategories}
          onClose={handleFormClose}
          onSave={handleSaveProduct}
        />
      )}

      {isDeleteOpen && deleteProduct && (
        <DeleteConfirmation
          itemName={deleteProduct.name}
          itemType="product"
          onClose={handleDeleteClose}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default Products;
