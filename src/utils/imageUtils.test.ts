import { describe, it, expect } from 'vitest';
import { optimizeCloudinaryUrl } from './imageUtils';

describe('optimizeCloudinaryUrl', () => {
  it('should return the original URL if it is not a Cloudinary URL', () => {
    const url = 'https://example.com/image.jpg';
    expect(optimizeCloudinaryUrl(url)).toBe(url);
  });

  it('should add transformation parameters to a Cloudinary URL', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
    const optimized = optimizeCloudinaryUrl(url);
    expect(optimized).toContain('/upload/q_auto,f_auto/');
  });

  it('should add width parameter if provided', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
    const optimized = optimizeCloudinaryUrl(url, 400);
    expect(optimized).toContain('w_400,c_scale');
  });

  it('should handle empty or null URLs', () => {
    expect(optimizeCloudinaryUrl('')).toBe('');
  });
});
