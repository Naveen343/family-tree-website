import { useQuery } from "@tanstack/react-query";
import supabase from "../lib/supabaseClient";

export function useFamilyMembers() {
  return useQuery({
    queryKey: ["family_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("family_members")
        .select("*")
        .order("birth_year", { ascending: true, nullsFirst: false });

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
