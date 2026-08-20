import { fetchStandings } from "@/lib/api/standings"
import { useQuery } from "@tanstack/react-query"


export const useStandings = (category?: string) => {
    return useQuery({
        queryKey: ["standings", category ?? "all"],
        queryFn: () => fetchStandings(category),
        initialData: [],
    })
}