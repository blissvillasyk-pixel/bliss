# Fitur Auto-Close Modal

## Overview
Fitur auto-close modal memungkinkan modal untuk tertutup secara otomatis setelah operasi save berhasil, memberikan pengalaman pengguna yang lebih baik dan efisien.

## Cara Kerja

### 1. Modifikasi useSave Hook
Hook `useSave` telah dimodifikasi untuk menerima parameter ketiga berupa callback function yang akan dijalankan setelah operasi berhasil:

```typescript
export const useSave = <TReq = unknown>(
  method: "post" | "put" | "patch" | "delete" | "get",
  url: string,
  onSuccessCallback?: () => void  // Callback baru
) => {
  // ... existing code ...
  
  onSuccess: (data: TRes) => {
    qc.invalidateQueries({ queryKey: ["root-data"] });
    toast({
      title: "Berhasil",
      description: data?.message || "Data berhasil disimpan",
    });
    // Call the success callback if provided
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  },
  
  // ... existing code ...
};
```

### 2. Implementasi di Mutation
Setiap mutation sekarang menggunakan callback untuk menutup modal yang sesuai:

```typescript
// Sebelumnya
const mHero = useSave("post", "/admin/hero");

// Sekarang
const mHero = useSave("post", "/admin/hero", () => setHero(null));
```

### 3. Modal yang Mendukung Auto-Close

#### Modal Create/Update:
- ✅ Hero Section
- ✅ About Section
- ✅ About Data Items
- ✅ Property Section
- ✅ Why Section
- ✅ Why Data Items
- ✅ CTA Section
- ✅ Services Section
- ✅ Service Data Items
- ✅ Testimonials Section
- ✅ Testimonial Data Items
- ✅ Related Properties Section
- ✅ Final CTA Section
- ✅ Property Page Section
- ✅ Logo Information
- ✅ Contact Information
- ✅ Copyright Information
- ✅ Property Items
- ✅ Social Media Items

#### Modal Delete:
- ✅ About Data Items
- ✅ Why Data Items
- ✅ Service Data Items
- ✅ Testimonial Data Items
- ✅ Social Media Items
- ✅ Property Items

## Keuntungan

### 1. **User Experience yang Lebih Baik**
- Modal otomatis tertutup setelah save berhasil
- Tidak perlu klik tombol close manual
- Workflow yang lebih lancar

### 2. **Konsistensi**
- Semua modal memiliki behavior yang sama
- Tidak ada modal yang "terlupa" ditutup

### 3. **Efisiensi**
- Mengurangi jumlah klik yang diperlukan
- Proses yang lebih cepat dan efisien

## Implementasi Teknis

### 1. **State Management**
Modal state dikelola menggunakan `useState` dengan pattern yang konsisten:

```typescript
const [hero, setHero] = useState<Partial<HeroSection> | null>(null);
const [about, setAbout] = useState<Partial<AboutSection> | null>(null);
// ... dan seterusnya
```

### 2. **Callback Pattern**
Callback function menggunakan arrow function yang memanggil setter dengan `null`:

```typescript
const mHero = useSave("post", "/admin/hero", () => setHero(null));
```

### 3. **Error Handling**
Modal tetap terbuka jika terjadi error, memungkinkan user untuk memperbaiki input dan mencoba lagi.

## Testing

### 1. **Test Create/Update**
1. Buka modal untuk create/update item
2. Isi form dengan data yang valid
3. Klik tombol "Simpan"
4. Modal harus tertutup otomatis setelah berhasil
5. Toast notification harus muncul

### 2. **Test Delete**
1. Buka modal untuk edit item
2. Klik tombol "Hapus"
3. Konfirmasi penghapusan
4. Modal harus tertutup otomatis setelah berhasil
5. Toast notification harus muncul

### 3. **Test Error Handling**
1. Buka modal untuk create/update item
2. Isi form dengan data yang tidak valid
3. Klik tombol "Simpan"
4. Modal harus tetap terbuka
5. Error toast harus muncul

## Troubleshooting

### Modal Tidak Tertutup
1. Periksa apakah callback function sudah benar
2. Pastikan state setter function sudah benar
3. Periksa console untuk error

### Modal Tertutup Terlalu Cepat
1. Periksa apakah ada race condition
2. Pastikan toast notification muncul
3. Periksa apakah data sudah tersimpan

### Modal Tertutup Meski Error
1. Periksa error handling di API
2. Pastikan response error sudah benar
3. Periksa network tab untuk response

## Best Practices

### 1. **Callback Naming**
Gunakan nama callback yang deskriptif:
```typescript
// ✅ Baik
const mHero = useSave("post", "/admin/hero", () => setHero(null));

// ❌ Kurang jelas
const mHero = useSave("post", "/admin/hero", () => setHero(null));
```

### 2. **State Management**
Pastikan state modal di-reset dengan benar:
```typescript
// ✅ Reset ke null
const [hero, setHero] = useState<Partial<HeroSection> | null>(null);

// ❌ Reset ke empty object
const [hero, setHero] = useState<Partial<HeroSection>>({});
```

### 3. **Error Handling**
Jangan tutup modal jika terjadi error:
```typescript
onSuccess: (data: TRes) => {
  // Hanya tutup modal jika berhasil
  if (onSuccessCallback) {
    onSuccessCallback();
  }
},
onError: (error) => {
  // Jangan tutup modal jika error
  // Modal tetap terbuka untuk user memperbaiki
}
```

## Update Terbaru

- ✅ Auto-close modal setelah save berhasil
- ✅ Auto-close modal setelah delete berhasil
- ✅ Callback system yang fleksibel
- ✅ Konsistensi behavior di semua modal
- ✅ Error handling yang lebih baik
- ✅ User experience yang ditingkatkan
