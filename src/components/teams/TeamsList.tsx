"use client"

import { useStandings } from "@/hooks/useStandings"
import { useTeams } from "@/hooks/useTeams"
import { TeamCard } from "./TeamCard"

export const TeamsList = () => {
    const { data, isLoading, error } = useTeams()
    const { data: standings } = useStandings()

    if (isLoading) {
        return <p>Cargando equipos...</p>;
    }

    if (error) {
        return <p>Error al cargar los equipos.</p>;
    }


    return (
        <>
            {data?.map((team) => {
                const standing = standings.find((row) => row.team._id === team._id)
                return (
                    <TeamCard key={team._id} team={team} standing={standing} />
                )
            })}
        </>
    )
}