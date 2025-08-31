"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Upload,
  X,
  Image as ImageIcon,
  FileIcon,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/api";

type AcceptType = string; // contoh: "image/*" atau "*"

interface MultiFileUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  accept?: AcceptType; // default "image/*"
  className?: string;
  maxSizeMB?: number; // default 5
  maxCount?: number; // opsional: batasi jumlah item
  uploadFieldName?: string; // nama field file untuk FormData (default: "image")
  uploadEndpoint?: string; // endpoint upload (default: "/image")
}

export function MultiFileUpload({
  value,
  onChange,
  accept = "image/*",
  className = "",
  maxSizeMB = 5,
  maxCount,
  uploadFieldName = "image",
  uploadEndpoint = "/image",
}: MultiFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [tempPreviews, setTempPreviews] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // revoke object URLs agar tidak bocor
  useEffect(() => {
    return () => {
      tempPreviews.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isImageMode = useMemo(() => accept.startsWith("image"), [accept]);
  const maxBytes = maxSizeMB * 1024 * 1024;

  const canAddMore = (incomingCount = 1) => {
    if (!maxCount) return true;
    return value.length + incomingCount <= maxCount;
  };

  const validate = (file: File) => {
    if (isImageMode && !file.type.startsWith("image/")) {
      return "Pilih berkas gambar.";
    }
    if (file.size > maxBytes) {
      return `Ukuran maksimal ${maxSizeMB}MB per berkas.`;
    }
    return null;
  };

  const uploadOne = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append(uploadFieldName, file);
    // respons sama seperti komponenmu: { url: string }
    const res = await api.post<{ url: string }>(uploadEndpoint, formData);
    return res.data.url;
  };

  const addUrls = (urls: string[]) => {
    if (!urls.length) return;
    let next = [...value, ...urls];
    if (maxCount && next.length > maxCount) {
      next = next.slice(0, maxCount);
    }
    onChange(next);
  };

  const handleFiles = async (filesList: FileList | File[]) => {
    const files = Array.from(filesList);
    if (!files.length) return;

    // batasi jumlah jika maxCount diset
    const remaining = maxCount
      ? Math.max(maxCount - value.length, 0)
      : files.length;
    const toProcess = maxCount ? files.slice(0, remaining) : files;

    // validasi
    for (const f of toProcess) {
      const err = validate(f);
      if (err) {
        alert(`${f.name}: ${err}`);
        return;
      }
    }

    // buat preview sementara
    const previews = toProcess.map((f) => URL.createObjectURL(f));
    setTempPreviews((prev) => [...prev, ...previews]);

    setIsUploading(true);
    try {
      const uploaded = await Promise.all(
        toProcess.map((f) => uploadOne(f).catch(() => ""))
      );
      const ok = uploaded.filter(Boolean) as string[];
      addUrls(ok);
    } catch (e) {
      console.error(e);
      alert("Gagal mengunggah sebagian/seluruh berkas. Coba lagi.");
    } finally {
      // bersihkan preview sementara
      setTempPreviews([]);
      previews.forEach((u) => URL.revokeObjectURL(u));
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await handleFiles(e.target.files);
      // reset input untuk bisa pilih file yang sama lagi
      e.target.value = "";
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer.files?.length) return;
    if (!canAddMore(e.dataTransfer.files.length)) {
      alert("Melebihi batas jumlah berkas.");
      return;
    }
    await handleFiles(e.dataTransfer.files);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const removeAt = (idx: number) => {
    const next = [...value];
    next.splice(idx, 1);
    onChange(next);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    const [item] = next.splice(idx, 1);
    next.splice(j, 0, item);
    onChange(next);
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!canAddMore(1)) {
      alert("Melebihi batas jumlah berkas.");
      return;
    }
    addUrls([trimmed]);
    setUrlInput("");
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Dropzone */}
      <div
        className="rounded-lg border border-dashed p-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-2 mb-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadClick}
            disabled={
              isUploading || (maxCount ? value.length >= maxCount : false)
            }
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Mengunggah..." : "Pilih File"}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="text-xs text-gray-500 ml-auto">
            {isImageMode ? (
              <span>Format: JPG, PNG, GIF, WebP</span>
            ) : (
              <span>Format dokumen umum</span>
            )}
            <span className="mx-2">•</span>
            <span>Maks {maxSizeMB}MB/berkas</span>
            {maxCount ? (
              <>
                <span className="mx-2">•</span>
                <span>Maks {maxCount} berkas</span>
              </>
            ) : null}
          </div>
        </div>

        {/* Grid preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
          {value.map((url, idx) => (
            <div key={`${url}-${idx}`} className="relative group">
              <div className="aspect-video w-full overflow-hidden rounded border bg-gray-50 flex items-center justify-center">
                {isImageMode ? (
                  <Image
                    src={url}
                    alt={`file-${idx}`}
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <FileIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>

              <div className="absolute inset-x-0 top-1 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7"
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  title="Geser kiri"
                >
                  <MoveLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7"
                  onClick={() => move(idx, +1)}
                  disabled={idx === value.length - 1}
                  title="Geser kanan"
                >
                  <MoveRight className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-7 w-7"
                  onClick={() => removeAt(idx)}
                  title="Hapus"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute left-1 top-1 inline-flex items-center gap-1 rounded bg-black/60 text-white px-1.5 py-0.5 text-[10px]">
                {isImageMode ? (
                  <ImageIcon className="h-3 w-3" />
                ) : (
                  <FileIcon className="h-3 w-3" />
                )}
                {idx + 1}
              </div>
            </div>
          ))}

          {/* Preview sementara saat upload */}
          {tempPreviews.map((u, i) => (
            <div key={`temp-${i}`} className="relative">
              <div className="aspect-video w-full overflow-hidden rounded border bg-gray-100">
                {isImageMode ? (
                  <Image
                    src={u}
                    alt="uploading"
                    width={640}
                    height={360}
                    className="h-full w-full object-cover opacity-70"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <FileIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs bg-white/80 px-2 py-1 rounded border">
                  Mengunggah...
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Url manual */}
        <div className="mt-3 flex gap-2">
          <input
            type="url"
            placeholder="Tempel URL lalu klik Tambah"
            className="flex-1 border rounded px-3 py-2 text-sm"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleAddUrl}
            disabled={
              !urlInput.trim() ||
              (maxCount ? value.length >= maxCount : false) ||
              !urlInput.match(
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
              )
            }
          >
            Tambah URL
          </Button>
        </div>

        {/* Hint drag & drop */}
        <p className="mt-2 text-xs text-gray-500">
          Seret & lepas beberapa {isImageMode ? "gambar" : "file"} di area ini
          untuk mengunggah.
        </p>
      </div>
    </div>
  );
}
