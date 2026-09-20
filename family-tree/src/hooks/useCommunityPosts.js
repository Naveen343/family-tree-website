import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../lib/supabaseClient";

const keyFor = (category) => ["community_posts", category];

export function useCommunityPosts(category) {
  return useQuery({
    queryKey: keyFor(category),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_posts")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useAddCommunityPost(category) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fields) => {
      const { data, error } = await supabase
        .from("community_posts")
        .insert({ ...fields, category })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keyFor(category) }),
  });
}

export function useUpdateCommunityPost(category) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...fields }) => {
      const { data, error } = await supabase
        .from("community_posts")
        .update(fields)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keyFor(category) }),
  });
}

export function useDeleteCommunityPost(category) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("community_posts").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keyFor(category) }),
  });
}
