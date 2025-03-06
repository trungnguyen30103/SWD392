import React, { useState, useEffect, useRef } from 'react';
import './ProductForm.scss';

const ProductForm = ({ product, categories, onClose, onSave }) => {
  // Main form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sale_price: '',
    stock_quantity: '',
    category_id: '',
    imageUrl: '',  // Main product image (thumbnail)
    sku: '',
    barcode: '',
    weight: '',
    featured: false,
    status: 'active',
    dimensions: {
      length: '',
      width: '',
      height: ''
    }
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState('general');
  
  // Product images state
  const [productImages, setProductImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs
  const fileInputRef = useRef(null);
  const multipleFileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const isEditing = !!product;

  // Initialize form with product data when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        sale_price: product.sale_price || '',
        stock_quantity: product.stock_quantity || '',
        category_id: product.category_id ? product.category_id.toString() : '',
        imageUrl: product.imageUrl || '',
        sku: product.sku || '',
        barcode: product.barcode || '',
        weight: product.weight || '',
        featured: product.featured || false,
        status: product.status || 'active',
        dimensions: {
          length: product.dimensions?.length || '',
          width: product.dimensions?.width || '',
          height: product.dimensions?.height || ''
        }
      });
      
      // If product has additional images
      if (product.productImages && product.productImages.length > 0) {
        setProductImages(product.productImages);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested fields (dimensions)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle main product image upload
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setErrors(prev => ({ ...prev, mainImage: "Please select an image file" }));
      return;
    }

    // In a real app, we would upload to server and get URL back
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, imageUrl }));
    
    if (errors.mainImage) {
      setErrors(prev => ({ ...prev, mainImage: null }));
    }
  };

  // Handle additional product images
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    processImageFiles(files);
  };
  
  // Process image files (used for both drop and file input)
  const processImageFiles = (files) => {
    if (!files.length) return;
    
    // Check if all files are images
    const nonImageFiles = files.filter(file => !file.type.match('image.*'));
    if (nonImageFiles.length > 0) {
      setErrors(prev => ({ ...prev, additionalImages: "All files must be images" }));
      return;
    }
    
    // Process each file (in a real app, we would upload to server)
    const newImages = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 10), // Temporary ID
      image_url: URL.createObjectURL(file),
      alt_text: file.name.split('.')[0], // Use filename as alt text
      file: file // Keep reference to file for upload
    }));
    
    setProductImages(prev => [...prev, ...newImages]);
    
    if (errors.additionalImages) {
      setErrors(prev => ({ ...prev, additionalImages: null }));
    }
  };

  // Handle drag and drop for image upload
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processImageFiles(files);
  };

  // Remove an additional image
  const handleRemoveImage = (imageId) => {
    setProductImages(prev => prev.filter(img => img.id !== imageId));
  };

  // Set alt text for an image
  const handleImageAltTextChange = (imageId, altText) => {
    setProductImages(prev => 
      prev.map(img => 
        img.id === imageId ? { ...img, alt_text: altText } : img
      )
    );
  };

  // Set main product image from additional images
  const setAsMainImage = (imageUrl) => {
    // Save current main image as additional if it exists
    if (formData.imageUrl) {
      const currentMainImage = {
        id: Date.now() + Math.random().toString(36).substring(2, 10),
        image_url: formData.imageUrl,
        alt_text: 'Product image'
      };
      setProductImages(prev => [...prev, currentMainImage]);
    }
    
    // Find and remove the selected image from additional images
    const selectedImage = productImages.find(img => img.image_url === imageUrl);
    setProductImages(prev => prev.filter(img => img.image_url !== imageUrl));
    
    // Set the selected image as main image
    setFormData(prev => ({
      ...prev,
      imageUrl
    }));
  };

  // Change active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) 
      newErrors.price = "Price must be a positive number";
    
    if (!formData.category_id) newErrors.category_id = "Category is required";
    
    if (formData.stock_quantity === '') newErrors.stock_quantity = "Stock quantity is required";
    else if (isNaN(formData.stock_quantity) || parseInt(formData.stock_quantity) < 0)
      newErrors.stock_quantity = "Stock must be a non-negative number";
    
    // At least one image required
    if (!formData.imageUrl && productImages.length === 0) 
      newErrors.mainImage = "At least one product image is required";
    
    // Validate sale price if provided
    if (formData.sale_price && (!isNaN(formData.price) && !isNaN(formData.sale_price))) {
      if (parseFloat(formData.sale_price) >= parseFloat(formData.price)) {
        newErrors.sale_price = "Sale price must be lower than regular price";
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Switch to the tab with errors
      if (validationErrors.name || validationErrors.price || validationErrors.category_id) {
        setActiveTab('general');
      } else if (validationErrors.mainImage) {
        setActiveTab('images');
      } else if (validationErrors.stock_quantity) {
        setActiveTab('inventory');
      }
      
      return;
    }
    
    setIsSubmitting(true);
    
    // Format data before saving
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
      stock_quantity: parseInt(formData.stock_quantity),
      category_id: parseInt(formData.category_id),
      // Include the additional images
      productImages: productImages.map(img => ({
        id: img.id,
        image_url: img.image_url,
        alt_text: img.alt_text
      }))
    };
    
    // In a real app, we would handle image uploads here before saving
    // Simulate API delay for the demo
    setTimeout(() => {
      onSave(productData);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form-container">
        <div className="form-header">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onClose} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-tabs">
            <button 
              type="button" 
              className={`form-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => handleTabChange('general')}
            >
              General Info
            </button>
            <button 
              type="button" 
              className={`form-tab ${activeTab === 'images' ? 'active' : ''}`}
              onClick={() => handleTabChange('images')}
            >
              Images
            </button>
            <button 
              type="button" 
              className={`form-tab ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => handleTabChange('inventory')}
            >
              Inventory
            </button>
          </div>
          
          {/* General Info Tab */}
          <div className={`tab-content ${activeTab === 'general' ? 'active' : ''}`}>
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-group">
                <label htmlFor="name">
                  Product Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Product Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your product in detail"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category_id">
                    Category <span className="required">*</span>
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className={errors.category_id ? 'error' : ''}
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <p className="error-text">{errors.category_id}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="status">Product Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <label htmlFor="featured">Featured Product</label>
              </div>
              
              <div className="pricing-section">
                <h4>Pricing</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">
                      Regular Price ($) <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={errors.price ? 'error' : ''}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="error-text">{errors.price}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="sale_price">Sale Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      id="sale_price"
                      name="sale_price"
                      value={formData.sale_price}
                      onChange={handleChange}
                      className={errors.sale_price ? 'error' : ''}
                      placeholder="0.00"
                    />
                    {errors.sale_price && <p className="error-text">{errors.sale_price}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Images Tab */}
          <div className={`tab-content ${activeTab === 'images' ? 'active' : ''}`}>
            <div className="form-section">
              <h3 className="section-title">
                Product Images
                <span className="section-subtitle">First image will be the product thumbnail</span>
              </h3>
              
              {/* Main product image */}
              <div className="form-group main-image-upload">
                <label>Main Product Image <span className="required">*</span></label>
                <div 
                  className={`image-preview-container ${errors.mainImage ? 'error' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.imageUrl ? (
                    <>
                      <img src={formData.imageUrl} alt="Product preview" className="image-preview" />
                      <div className="image-overlay">
                        <button 
                          type="button" 
                          className="change-image-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          Change Image
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="image-placeholder">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p>Upload main product image</p>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  id="mainImage" 
                  accept="image/*"
                  className="file-input"
                  onChange={handleMainImageChange}
                  ref={fileInputRef}
                />
                {errors.mainImage && <p className="error-text">{errors.mainImage}</p>}
              </div>
              
              {/* Additional images with drag & drop */}
              <div className="form-group additional-images">
                <label>Additional Images</label>
                
                {/* Drag & Drop Zone */}
                <div 
                  className={`dropzone ${isDragging ? 'dragging' : ''}`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  ref={dropZoneRef}
                >
                  <div className="dropzone-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>Drag and drop images here or</p>
                    <button 
                      type="button" 
                      className="browse-btn"
                      onClick={() => multipleFileInputRef.current?.click()}
                    >
                      Browse Files
                    </button>
                  </div>
                  <input 
                    type="file" 
                    id="additionalImages" 
                    accept="image/*"
                    multiple
                    className="file-input"
                    onChange={handleAdditionalImagesChange}
                    ref={multipleFileInputRef}
                  />
                </div>
                {errors.additionalImages && <p className="error-text">{errors.additionalImages}</p>}
              </div>
              
              {/* Images gallery */}
              {productImages.length > 0 && (
                <div className="images-gallery">
                  <h4>Product Gallery ({productImages.length} images)</h4>
                  <div className="gallery-grid">
                    {productImages.map((image) => (
                      <div className="gallery-item" key={image.id}>
                        <div className="image-container">
                          <img src={image.image_url} alt={image.alt_text} />
                          <div className="image-actions">
                            <button 
                              type="button"
                              className="action-btn make-main"
                              onClick={() => setAsMainImage(image.image_url)}
                              title="Set as main image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span>Make main</span>
                            </button>
                            <button 
                              type="button"
                              className="action-btn remove"
                              onClick={() => handleRemoveImage(image.id)}
                              title="Remove image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                        <div className="image-details">
                          <input
                            type="text"
                            placeholder="Alt text"
                            value={image.alt_text || ''}
                            onChange={(e) => handleImageAltTextChange(image.id, e.target.value)}
                            className="alt-text-input"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Inventory Tab */}
          <div className={`tab-content ${activeTab === 'inventory' ? 'active' : ''}`}>
            <div className="form-section">
              <h3 className="section-title">Inventory Management</h3>
              
              <div className="form-group">
                <label htmlFor="stock_quantity">
                  Stock Quantity <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="stock_quantity"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  className={errors.stock_quantity ? 'error' : ''}
                  placeholder="0"
                />
                {errors.stock_quantity && <p className="error-text">{errors.stock_quantity}</p>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sku">SKU (Stock Keeping Unit)</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="SKU-12345"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="barcode">Barcode (UPC/EAN)</label>
                  <input
                    type="text"
                    id="barcode"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    placeholder="Enter barcode"
                  />
                </div>
              </div>
              
              <div className="shipping-section">
                <h4>Shipping Information</h4>
                
                <div className="form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="dimensions-section">
                  <label>Dimensions (cm)</label>
                  <div className="dimensions-group">
                    <div className="form-group">
                      <label htmlFor="dimensions.length">Length</label>
                      <input
                        type="number"
                        step="0.1"
                        id="dimensions.length"
                        name="dimensions.length"
                        value={formData.dimensions.length}
                        onChange={handleChange}
                        placeholder="0.0"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dimensions.width">Width</label>
                      <input
                        type="number"
                        step="0.1"
                        id="dimensions.width"
                        name="dimensions.width"
                        value={formData.dimensions.width}
                        onChange={handleChange}
                        placeholder="0.0"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dimensions.height">Height</label>
                      <input
                        type="number"
                        step="0.1"
                        id="dimensions.height"
                        name="dimensions.height"
                        value={formData.dimensions.height}
                        onChange={handleChange}
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="inventory-options">
                <h4>Inventory Options</h4>
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="track-inventory"
                    name="track_inventory"
                    checked={formData.track_inventory !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, track_inventory: e.target.checked }))}
                  />
                  <label htmlFor="track-inventory">Track inventory for this product</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="allow-backorders"
                    name="allow_backorders"
                    checked={formData.allow_backorders || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, allow_backorders: e.target.checked }))}
                  />
                  <label htmlFor="allow-backorders">Allow customers to purchase when out of stock</label>
                </div>
                
                <div className="form-group">
                  <label htmlFor="low_stock_threshold">Low stock threshold</label>
                  <input
                    type="number"
                    id="low_stock_threshold"
                    name="low_stock_threshold"
                    value={formData.low_stock_threshold || ''}
                    onChange={handleChange}
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-save"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                isEditing ? 'Update Product' : 'Save Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
