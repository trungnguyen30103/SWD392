/**
 * @typedef {import('../types/Product').Product} Product
 * @typedef {import('../types/ProductImage').ProductImage} ProductImage
 * @typedef {import('../types/Category').Category} Category
 */

import db from '../db/db.json';
import { 
  mockCategories,
  mockProducts,
  mockProductImages
} from './ProductDetail';

/**
 * Banner data for homepage carousel
 */
export const mockBanners = db.banners;

/**
 * Featured products for homepage
 * @type {Product[]}
 */
export const mockFeaturedProducts = mockProducts;

/**
 * Promotional content
 */
export const mockPromoContent = db.promoContent;

/**
 * All homepage mock data
 */
export const homepageMockData = {
  categories: mockCategories,
  featuredProducts: mockFeaturedProducts,
  banners: mockBanners,
  promo: mockPromoContent,
  productImages: mockProductImages
};

// Re-export shared data for convenience
export { 
  mockCategories,
  mockProducts,
  mockProductImages
};

export default homepageMockData;
