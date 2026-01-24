// Get the basePath based on build environment
const basePath = process.env.NODE_ENV === 'production' 
  ? '/clients/hndsup/webbyawards' 
  : '';

// Helper to get asset path
export const getAssetPath = (path) => `${basePath}${path}`;
