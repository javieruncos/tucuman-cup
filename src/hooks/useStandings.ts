import { fetchStandings } from "@/lib/api/standings"
import { useQuery } from "@tanstack/react-query"


export const useStandings = () => {
    return useQuery({
        queryKey: ["standings"],
        queryFn: fetchStandings,
        initialData: [],
    })
}