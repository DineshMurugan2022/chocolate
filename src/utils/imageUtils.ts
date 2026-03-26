/**
 * Optimizes a Cloudinary image URL by adding transformation parameters.
 * @param url The original Cloudinary URL
 * @param width Optional width for scaling
 * @returns Optimized URL string
 */
export const optimizeCloudinaryUrl = (url: string, width?: number): string => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Basic optimization: auto quality and auto format
  let params = 'q_auto,f_auto';
  
  if (width) {
    params += `,w_${width},c_scale`;
  }

  // Insert params after '/upload/'
  return url.replace('/upload/', `/upload/${params}/`);
};
