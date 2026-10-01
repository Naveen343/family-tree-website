import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../lib/supabaseClient";

const ADMIN_QUERY_KEY = ["matrimony_interests"];
const PUBLIC_QUERY_KEY = ["matrimony_interests_public"];
const PUBLIC_COLUMNS =
  "id, full_name, age, gender, branch, education, occupation, location, about, photo_urls, created_at";

function invalidateAll(queryClient) {
  queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEY });
  queryClient.invalidateQueries({ queryKey: PUBLIC_QUERY_KEY });
}

export function useSubmitMatrimonyInterest() {
  const queryClient = useQueryClient();
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
    onSuccess: () => invalidateAll(queryClient),
  });
}

// Public grid on the Family Matrimony page. Deliberately leaves out
// contact_phone/contact_email — those stay visible only in the admin view.
export function useMatrimonyInterestsPublic() {
  return useQuery({
    queryKey: PUBLIC_QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("matrimony_interests")
        .select(PUBLIC_COLUMNS)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// Admin-only (Upload Dashboard) — includes contact details and status.
export function useMatrimonyInterestsAdmin() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEY,
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
    onSuccess: () => invalidateAll(queryClient),
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
    onSuccess: () => invalidateAll(queryClient),
  });
}
