import { useState, useEffect, useRef } from 'react';

interface UseYouTubePlayerProps {
  videoUrl?: string | null;
  onPlay?: () => void;
  onPause?: () => void;
}

export const useYouTubePlayer = ({ videoUrl, onPlay, onPause }: UseYouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extract video ID from URL
  const getVideoId = (url: string): string | null => {
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

  // Check if video is playing by monitoring iframe activity
  const checkVideoStatus = () => {
    if (!iframeRef.current || !isVideoLoaded) return;

    try {
      // Try to access iframe content (this might be blocked by CORS)
      const iframe = iframeRef.current;
      
      // Alternative approach: check if iframe is focused or has user interaction
      // This is a heuristic approach since we can't directly access YouTube iframe content
      
      // We'll use a combination of approaches:
      // 1. Check if iframe is focused
      // 2. Monitor mouse events on iframe
      // 3. Use a timer-based approach
      
      // For now, we'll implement a basic timer-based detection
      // In a real implementation, you might want to use YouTube Player API
    } catch (error) {
      // CORS error or other issues
      console.log('Cannot access iframe content due to CORS restrictions');
    }
  };

  // Start monitoring video status
  useEffect(() => {
    if (!videoUrl || !isVideoLoaded) return;

    // Start checking video status every 2 seconds
    checkIntervalRef.current = setInterval(checkVideoStatus, 2000);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [videoUrl, isVideoLoaded]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsVideoLoaded(true);
  };

  // Manual play/pause controls (since we can't detect actual YouTube state)
  const playVideo = () => {
    setIsPlaying(true);
    onPlay?.();
  };

  const pauseVideo = () => {
    setIsPlaying(false);
    onPause?.();
  };

  // Reset when video URL changes
  useEffect(() => {
    setIsPlaying(false);
    setIsVideoLoaded(false);
    
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
  }, [videoUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  return {
    isPlaying,
    isVideoLoaded,
    iframeRef,
    handleIframeLoad,
    playVideo,
    pauseVideo,
    videoId: videoUrl ? getVideoId(videoUrl) : null
  };
};
