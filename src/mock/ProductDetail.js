/**
 * @typedef {import('../types/Product').Product} Product
 * @typedef {import('../types/Review').Review} Review
 * @typedef {import('../types/ProductImage').ProductImage} ProductImage
 * @typedef {import('../types/Discount').Discount} Discount
 * @typedef {import('../types/Category').Category} Category
 */

import db from '../db/db.json';

/**
 * Mock product categories
 * @type {Category[]}
 */
export const mockCategories = db.categories;

/**
 * Mock products
 * @type {Product[]}
 */
export const mockProducts = db.products.map(product => {
  // Reattach the category to each product
  return {
    ...product,
    category: mockCategories.find(cat => cat.id === product.category_id) || mockCategories[0]
  };
});

/**
 * Mock product images data
 * @type {ProductImage[]}
 */
export const mockProductImages = db.productImages;

/**
 * Mock reviews
 * @type {Object.<number, Review[]>}
 */
export const mockReviews = db.reviews;

/**
 * Mock discounts
 * @type {Object.<number, Discount>}
 */
export const mockDiscounts = db.discounts;

/**
 * Get mock product by ID
 * @param {number} id - Product ID
 * @returns {Product|undefined}
 */
export const getMockProductById = (id) => {
  return mockProducts.find(product => product.id === parseInt(id));
};

/**
 * Get mock product images by product ID
 * @param {number} productId - Product ID
 * @returns {ProductImage[]}
 */
export const getMockProductImagesById = (productId) => {
  return mockProductImages.filter(image => image.product_id === parseInt(productId));
};

/**
 * Get mock reviews by product ID
 * @param {number} productId - Product ID
 * @returns {Review[]}
 */
export const getMockReviewsById = (productId) => {
  return mockReviews[productId] || [];
};

/**
 * Get mock discount by product ID
 * @param {number} productId - Product ID
 * @returns {Discount|null}
 */
export const getMockDiscountById = (productId) => {
  return mockDiscounts[productId] || null;
};

/**
 * Get mock similar products by product ID
 * @param {number} productId
 */
export const getMockSimilarProducts = (productId) => {
  // In a real app, this would return products similar to the given product
  return mockProducts;
};

/**
 * Get mock recommended products
 */
export const getMockRecommendedProducts = () => {
  return mockProducts;
};
