import { fetchTeamId } from "@/lib/api/teams"
import { useQuery } from "@tanstack/react-query"


export const useTeam = (id:string)=>{
    return useQuery ({
        queryKey:["team",id],
        queryFn:()=> fetchTeamId(id)
    })
}