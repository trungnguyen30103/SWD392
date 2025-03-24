import React from 'react';
import './ProductsList.scss';
import { formatCurrency, formatDate } from '../../../utils/format';

const ProductsList = ({ 
  products, 
  viewMode, 
  onEdit, 
  onDelete, 
  categories,
  loading,
  // Pagination props
  totalCount,
  currentPage = 1,
  pageSize = 10,
  onPageChange
}) => {
  // Map category IDs to names for display
  const getCategoryName = (categoryId) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  // Helper function to show appropriate stock status badge
  const renderStockStatus = (stockQuantity) => {
    if (stockQuantity <= 0) {
      return <span className="badge out-of-stock">Out of stock</span>;
    } else if (stockQuantity <= 5) {
      return <span className="badge low-stock">Low stock</span>;
    } else {
      return <span className="badge in-stock">In stock</span>;
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);
  
  // Create pagination controls
  const renderPagination = () => {
    if (!totalCount || totalPages <= 1) return null;
    
    // Generate page numbers array (limit display to 5 pages)
    let pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Adjust if we're at the beginning or end
    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="products-pagination">
        <button 
          className="page-btn prev" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        {startPage > 1 && (
          <>
            <button 
              className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="page-ellipsis">...</span>}
          </>
        )}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`page-btn ${currentPage === number ? 'active' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="page-ellipsis">...</span>}
            <button 
              className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button 
          className="page-btn next" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <div className="page-info">
          <span>
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} products
          </span>
        </div>
      </div>
    );
  };

  // Show loading skeleton if loading
  if (loading) {
    return (
      <div className="products-skeleton">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="product-skeleton-row">
            <div className="skeleton-image"></div>
            <div className="skeleton-text skeleton-name"></div>
            <div className="skeleton-text skeleton-category"></div>
            <div className="skeleton-text skeleton-price"></div>
            <div className="skeleton-text skeleton-stock"></div>
            <div className="skeleton-actions"></div>
          </div>
        ))}
      </div>
    );
  }

  // Grid View (optimized for pagination, not suitable for millions of records)
  if (viewMode === 'grid' && products.length > 0) {
    return (
      <>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'} 
                  alt={product.name} 
                  className="product-image" 
                />
                {product.featured && (
                  <span className="featured-badge">Featured</span>
                )}
                <div className="product-actions">
                  <button className="edit-btn" onClick={() => onEdit(product)} title="Edit product">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(product)} title="Delete product">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">
                  {getCategoryName(product.category_id)}
                </p>
                <div className="product-details">
                  <div className="product-price">{formatCurrency(product.price)}</div>
                  {renderStockStatus(product.stock_quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {renderPagination()}
      </>
    );
  }
  
  // List View (more suitable for large data sets)
  return (
    <>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/50x50?text=No+Image'} 
                      alt={product.name} 
                      className="product-thumbnail" 
                    />
                    <div className="product-name-container">
                      <h3>{product.name}</h3>
                      <span className="product-id">ID: {product.id}</span>
                    </div>
                    {product.featured && (
                      <span className="featured-tag">Featured</span>
                    )}
                  </div>
                </td>
                <td>{getCategoryName(product.category_id)}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>
                  <div className="stock-cell">
                    <span className="stock-number">{product.stock_quantity}</span>
                    {renderStockStatus(product.stock_quantity)}
                  </div>
                </td>
                <td className="updated-cell">
                  {formatDate(product.updated_at || product.created_at, { 
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => onEdit(product)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Edit</span>
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(product)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM12 8v8M8 12h8"/>
            </svg>
            <p>No products found matching your criteria</p>
            <span>Try adjusting your filters or search terms</span>
          </div>
        )}
      </div>
      {renderPagination()}
    </>
  );
};

export default ProductsList;
