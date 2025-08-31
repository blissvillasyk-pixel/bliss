import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { PropertyResponse } from "@/app/api/property/[id]/route";

export const getProperty = async (id: string) => {
  const response = await api.get<PropertyResponse>(`/property/${id}`);
  return response.data;
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
    enabled: !!id,
  });
};
