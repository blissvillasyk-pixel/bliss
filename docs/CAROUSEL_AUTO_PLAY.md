# Fitur Carousel Otomatis pada Testimonial

## Overview
Fitur carousel otomatis memungkinkan testimonial bergeser secara otomatis setiap 5 detik, memberikan pengalaman yang lebih dinamis dan interaktif kepada pengunjung website.

## Fitur Utama

### 1. **Auto-Play Carousel**
- Testimonial bergeser otomatis setiap **5 detik**
- Transisi yang smooth dan responsif
- Dapat di-pause dan resume secara manual

### 2. **Smart Video Detection**
- Auto-play otomatis berhenti ketika video YouTube diputar
- Auto-play resume ketika video di-pause
- Integrasi cerdas dengan YouTube player

### 3. **Manual Control**
- Tombol navigasi manual (prev/next)
- Kontrol auto-play (pause/resume)
- Indikator testimonial yang dapat diklik

## Cara Kerja

### Auto-Play Timer
```typescript
useEffect(() => {
  if (!isAutoPlay || isVideoPlaying || !data?.testimonial?.testimonialData?.length) {
    return;
  }

  autoPlayRef.current = setInterval(() => {
    nextTestimonial();
  }, 5000); // 5 detik

  return () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };
}, [isAutoPlay, isVideoPlaying, data?.testimonial?.testimonialData?.length]);
```

### Video Integration
```typescript
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
    setIsAutoPlay(false);  // Stop auto-play
    setShowPauseButton(true);
  },
  onPause: () => {
    setIsAutoPlay(true);   // Resume auto-play
    setShowPauseButton(false);
  }
});
```

## Komponen UI

### 1. **Tombol Kontrol Auto-Play**
- **Pause Auto-play**: Menghentikan carousel otomatis
- **Resume Auto-play**: Memulai kembali carousel otomatis
- Status visual yang jelas

### 2. **Navigasi Manual**
- Tombol **Previous** dan **Next**
- Reset timer auto-play setelah navigasi manual
- Konsistensi behavior

### 3. **Indikator Testimonial**
- Dot indicators yang dapat diklik
- Reset timer auto-play setelah klik manual
- Visual feedback yang jelas

### 4. **Status Auto-Play**
- Indikator visual status auto-play
- Informasi video yang sedang diputar
- Real-time status updates

## Behavior Rules

### 1. **Auto-Play Conditions**
- ✅ **Aktif** ketika tidak ada video yang diputar
- ✅ **Aktif** ketika user belum menghentikan manual
- ❌ **Nonaktif** ketika video YouTube sedang diputar
- ❌ **Nonaktif** ketika user pause manual

### 2. **Timer Reset**
- Timer di-reset setelah navigasi manual
- Timer di-reset setelah perubahan testimonial
- Timer di-reset setelah video interaction

### 3. **Video Integration**
- Auto-play berhenti otomatis saat video play
- Auto-play resume otomatis saat video pause
- Seamless integration tanpa konflik

## Custom Hook: useYouTubePlayer

### Purpose
Hook khusus untuk mengelola YouTube player dan mendeteksi status video.

### Features
- **Video Status Detection**: Mendeteksi apakah video sedang diputar
- **Event Handling**: Callback untuk play/pause events
- **URL Parsing**: Support berbagai format YouTube URL
- **Cleanup Management**: Proper cleanup untuk memory management

### Usage
```typescript
const {
  isPlaying,
  isVideoLoaded,
  iframeRef,
  handleIframeLoad,
  playVideo,
  pauseVideo,
  videoId
} = useYouTubePlayer({
  videoUrl: currentTestimonial?.urlVideo,
  onPlay: () => setIsAutoPlay(false),
  onPause: () => setIsAutoPlay(true)
});
```

## User Experience

### 1. **Seamless Navigation**
- Transisi otomatis yang smooth
- Tidak ada interupsi tiba-tiba
- Konsistensi behavior

### 2. **Smart Pause**
- Auto-pause saat video diputar
- User tidak kehilangan konten video
- Resume otomatis setelah video selesai

### 3. **Manual Control**
- User dapat mengontrol kecepatan
- Navigasi manual yang responsif
- Feedback visual yang jelas

## Technical Implementation

### 1. **State Management**
```typescript
const [isAutoPlay, setIsAutoPlay] = useState(true);
const [isVideoPlaying, setIsVideoPlaying] = useState(false);
const [showPauseButton, setShowPauseButton] = useState(false);
```

### 2. **Timer Management**
```typescript
const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

// Cleanup function
useEffect(() => {
  return () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };
}, []);
```

### 3. **Event Handling**
```typescript
const handleManualNavigation = (direction: 'prev' | 'next') => {
  // Navigate
  if (direction === 'prev') {
    prevTestimonial();
  } else {
    nextTestimonial();
  }
  
  // Reset timer
  if (autoPlayRef.current) {
    clearInterval(autoPlayRef.current);
  }
  
  // Restart if conditions met
  if (isAutoPlay && !isVideoPlaying) {
    autoPlayRef.current = setInterval(() => {
      nextTestimonial();
    }, 5000);
  }
};
```

## Testing Scenarios

### 1. **Auto-Play Functionality**
- ✅ Testimonial bergeser setiap 5 detik
- ✅ Timer berhenti saat video diputar
- ✅ Timer resume saat video di-pause

### 2. **Manual Navigation**
- ✅ Tombol prev/next berfungsi
- ✅ Timer reset setelah navigasi manual
- ✅ Indikator testimonial dapat diklik

### 3. **Video Integration**
- ✅ Auto-play berhenti saat video play
- ✅ Auto-play resume saat video pause
- ✅ Tidak ada konflik antara carousel dan video

### 4. **User Controls**
- ✅ Tombol pause/resume auto-play berfungsi
- ✅ Status visual yang akurat
- ✅ Feedback yang jelas untuk user

## Best Practices

### 1. **Timer Management**
- Selalu cleanup interval saat component unmount
- Reset timer setelah user interaction
- Handle edge cases dengan proper

### 2. **State Synchronization**
- Jaga konsistensi antara auto-play dan video status
- Update state secara atomic
- Avoid race conditions

### 3. **User Experience**
- Berikan feedback visual yang jelas
- Jangan interupsi user yang sedang menonton video
- Konsistensi behavior di semua kondisi

## Troubleshooting

### Auto-Play Tidak Berfungsi
1. Periksa apakah `isAutoPlay` state true
2. Periksa apakah video sedang diputar
3. Periksa console untuk error

### Timer Tidak Reset
1. Pastikan cleanup function berjalan
2. Periksa dependency array di useEffect
3. Pastikan ref di-clear dengan benar

### Video Integration Error
1. Periksa YouTube URL format
2. Periksa CORS restrictions
3. Periksa iframe loading events

## Update Terbaru

- ✅ Carousel otomatis setiap 5 detik
- ✅ Smart video detection
- ✅ Manual control yang responsif
- ✅ Timer management yang robust
- ✅ User experience yang seamless
- ✅ Integration dengan YouTube player
- ✅ Custom hook untuk video management
- ✅ Proper cleanup dan memory management
