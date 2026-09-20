import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../lib/supabaseClient";

const QUERY_KEY = ["matrimony_interests"];

export function useSubmitMatrimonyInterest() {
  return useMutation({
    mutationFn: async (fields) => {
      const { data, error } = await supabase
        .from("matrimony_interests")
        .insert(fields)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
}

// Admin-only (Upload Dashboard). Never called from the public matrimony page.
export function useMatrimonyInterestsAdmin() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("matrimony_interests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateMatrimonyInterest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { data, error } = await supabase
        .from("matrimony_interests")
        .update(fields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteMatrimonyInterest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("matrimony_interests").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
