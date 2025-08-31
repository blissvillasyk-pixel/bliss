"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quote, ChevronLeft, ChevronRight, Star, Pause, Play } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useData } from "@/service/data";
import { convertToEmbedUrl } from "@/helper/youtube";
import { useYouTubePlayer } from "@/hooks/use-youtube-player";

export function TestimonialsSection() {
  const { data, isLoading } = useData();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentTestimonial = data?.testimonial?.testimonialData[currentIndex];

  // YouTube player hook
  const {
    isPlaying: isVideoPlaying,
    isVideoLoaded,
    iframeRef,
    handleIframeLoad,
    playVideo,
    pauseVideo
  } = useYouTubePlayer({
    videoUrl: currentTestimonial?.urlVideo,
    onPlay: () => {
      setIsAutoPlay(false);
    },
    onPause: () => {
      setIsAutoPlay(true);
    }
  });

  const nextTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % (data?.testimonial?.testimonialData?.length || 0)
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (data?.testimonial?.testimonialData?.length || 0)) %
        (data?.testimonial?.testimonialData?.length || 0)
    );
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || isVideoPlaying || !data?.testimonial?.testimonialData?.length) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, isVideoPlaying, data?.testimonial?.testimonialData?.length]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Reset auto-play when testimonial changes manually
  const handleManualNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      prevTestimonial();
    } else {
      nextTestimonial();
    }
    
    // Reset auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    // Restart auto-play after manual navigation
    if (isAutoPlay && !isVideoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
  };

  // Handle video interaction
  const handleVideoInteraction = () => {
    if (!isVideoPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading && !data) return null;

  return (
    <section className="py-12 lg:py-20 bg-white" id="testimonials">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-primary-600 font-medium mb-2">Testimoni</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {data?.testimonial?.title || "Apa Kata Mereka"}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data?.testimonial?.subtitle || "Testimoni tamu yang menikmati pengalaman menginap di Bliss Villas."}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Testimonial */}
          <AnimatedSection>
            <Card className="p-6 lg:p-8 rounded-2xl shadow-lg border-0 bg-gray-50">
              <CardContent className="space-y-6">
                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <Quote className="h-6 w-6 text-primary-600" />
                </div>

                <div className="flex justify-center mb-4">
                  {renderStars(currentTestimonial?.rating || 5)}
                </div>

                <blockquote className="text-lg lg:text-xl text-gray-900 leading-relaxed font-medium">
                  &ldquo;{currentTestimonial?.content || "Pengalaman menginap yang menyenangkan! Villa bersih, nyaman, dan pelayanan ramah."}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={currentTestimonial?.image || ""} alt={currentTestimonial?.name || "Tamu"} />
                      <AvatarFallback className="bg-primary-100 text-primary-600 font-semibold">
                        {(currentTestimonial?.name || "Tamu").split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-gray-900">{currentTestimonial?.name || "Tamu Bliss Villas"}</div>
                      <div className="text-sm text-gray-600">{currentTestimonial?.role || "Tamu"}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 p-0 rounded-lg border-gray-200 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200 focus-visible:focus"
                      onClick={() => handleManualNavigation('prev')}
                      aria-label="Testimoni sebelumnya"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 p-0 rounded-lg border-gray-200 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200 focus-visible:focus"
                      onClick={() => handleManualNavigation('next')}
                      aria-label="Testimoni berikutnya"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Right Column - YouTube Video Card */}
          <AnimatedSection delay={0.2}>
            <Card className="p-6 rounded-2xl shadow-lg border-0 bg-gray-50">
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Video Testimoni
                  </h3>
                  <p className="text-gray-600">
                    Lihat langsung pengalaman klien kami
                  </p>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
                  {currentTestimonial?.urlVideo ? (
                    <>
                      <iframe
                        ref={iframeRef}
                        src={convertToEmbedUrl(currentTestimonial.urlVideo)}
                        title="Testimoni Klien Bliss Villas Group"
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                      />
                      
                      {/* Video control overlay */}
                      {isVideoLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/20">
                          <Button
                            onClick={handleVideoInteraction}
                            className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg"
                            size="sm"
                          >
                            {isVideoPlaying ? (
                              <>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Play
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full grid place-items-center text-gray-500 text-sm">
                      Video belum tersedia
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Video testimoni dari klien yang telah mempercayai Bliss
                    Villas Group
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {(data?.testimonial?.testimonialData || new Array(3).fill(null)).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus-visible:focus ${
                index === currentIndex
                  ? "bg-primary-600 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => {
                setCurrentIndex(index);
                // Reset auto-play timer on manual navigation
                if (autoPlayRef.current) {
                  clearInterval(autoPlayRef.current);
                }
                if (isAutoPlay && !isVideoPlaying) {
                  autoPlayRef.current = setInterval(() => {
                    nextTestimonial();
                  }, 5000);
                }
              }}
              aria-label={`Pergi ke testimoni ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
