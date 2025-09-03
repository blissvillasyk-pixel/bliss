import { RootData } from "@/app/api/data/route";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getData = async () => {
  // Append a cache-busting param to avoid browser/proxy caching on admin
  const response = await api.get<RootData>("/data", { params: { t: Date.now() } });
  return response.data;
};

export const useData = () => {
  return useQuery({
    queryKey: ["root-data"],
    queryFn: getData,
  });
};

type TRes = { message: string };

export const useSave = <TReq = unknown>(
  method: "post" | "put" | "patch" | "delete" | "get",
  url: string,
  onSuccessCallback?: () => void
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: TReq) => {
      const res = await api[method]<TRes>(url, body);
      return res.data;
    },
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
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: "Gagal",
          description: error.response?.data?.message || "Terjadi kesalahan",
          variant: "destructive",
          className: "text-white",
        });
      } else {
        toast({
          title: "Gagal",
          description: "Terjadi kesalahan",
          variant: "destructive",
          className: "text-white",
        });
      }
    },
  });
};
