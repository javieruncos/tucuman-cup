import { fetchStandings } from "@/lib/api/standings"
import { useQuery } from "@tanstack/react-query"
import { StandingType } from "@/models/Stading"



export const useStandings = () => {
    return useQuery({
        queryKey: ["standings"],
        queryFn:fetchStandings,
        initialData:[],
    })
}