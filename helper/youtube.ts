/**
 * Helper functions for YouTube URL handling
 */

/**
 * Converts various YouTube URL formats to embed format
 * Supports:
 * - YouTube Watch URLs: https://www.youtube.com/watch?v=VIDEO_ID
 * - YouTube Shorts: https://youtube.com/shorts/VIDEO_ID
 * - YouTube Short URLs: https://youtu.be/VIDEO_ID
 * - YouTube Embed URLs: https://www.youtube.com/embed/VIDEO_ID (already correct)
 * 
 * @param url - The YouTube URL to convert
 * @returns The embed URL format
 */
export const convertToEmbedUrl = (url: string): string => {
  if (!url) return "";
  
  // Handle YouTube Shorts
  if (url.includes('youtube.com/shorts/')) {
    const shortsId = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)?.[1];
    if (shortsId) {
      return `https://www.youtube.com/embed/${shortsId}`;
    }
  }
  
  // Handle regular YouTube watch URLs
  if (url.includes('youtube.com/watch')) {
    const videoId = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Handle YouTube embed URLs (already correct format)
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  
  // Handle youtu.be short URLs
  if (url.includes('youtu.be/')) {
    const videoId = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // If no pattern matches, return original URL
  return url;
};

/**
 * Extracts video ID from various YouTube URL formats
 * 
 * @param url - The YouTube URL
 * @returns The video ID or null if not found
 */
export const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // YouTube Shorts
  if (url.includes('youtube.com/shorts/')) {
    return url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)?.[1] || null;
  }
  
  // YouTube Watch
  if (url.includes('youtube.com/watch')) {
    return url.match(/[?&]v=([a-zA-Z0-9_-]+)/)?.[1] || null;
  }
  
  // YouTube Embed
  if (url.includes('youtube.com/embed/')) {
    return url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)?.[1] || null;
  }
  
  // youtu.be
  if (url.includes('youtu.be/')) {
    return url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)?.[1] || null;
  }
  
  return null;
};

/**
 * Validates if a URL is a valid YouTube URL
 * 
 * @param url - The URL to validate
 * @returns True if valid YouTube URL
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  if (!url) return false;
  
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/shorts\/[a-zA-Z0-9_-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/,
    /^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]+/
  ];
  
  return patterns.some(pattern => pattern.test(url));
};
