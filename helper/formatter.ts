export const convertToTitleCase = (input: string) => {
  return input
    .toLowerCase() // Ubah semua huruf ke huruf kecil
    .split("_") // Pisahkan berdasarkan underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
    .join(" "); // Gabungkan kembali dengan spasi
};

export const convertToIDR = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedPrice;
};

export const convertToPhoneNumber = (phone: string) => {
  const formattedPhone = "+" + phone.replace(/-/g, "");
  return formattedPhone;
};

export const converToReadablePhoneNumber = (raw: string) => {
  if (!raw) return "";

  // Hapus semua non-digit
  const onlyDigits = raw.replace(/\D/g, "");

  // Normalisasi ke awalan 62
  let normalized = onlyDigits;
  if (onlyDigits.startsWith("62")) {
    normalized = onlyDigits;
  } else if (onlyDigits.startsWith("0")) {
    normalized = "62" + onlyDigits.slice(1);
  } else if (onlyDigits.startsWith("8")) {
    normalized = "62" + onlyDigits; // umum: 8xx... untuk seluler
  }

  if (!normalized.startsWith("62")) {
    // fallback kalau bukan nomor IDN
    return raw;
  }

  const local = normalized.slice(2); // buang '62'
  if (!local) return "+62";

  const groups: string[] = [];
  // 3 digit pertama
  groups.push(local.slice(0, Math.min(3, local.length)));

  // sisanya per 4 digit
  let rest = local.slice(3);
  while (rest.length > 0) {
    groups.push(rest.slice(0, 4));
    rest = rest.slice(4);
  }

  return `+62 ${groups.join(" ").trim()}`;
};
