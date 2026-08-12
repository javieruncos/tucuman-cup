"use client"

import { useTeams } from "@/hooks/useTeams"
import { TeamCard } from "./TeamCard"

export const TeamsList = () => {
    const { data, isLoading, error } = useTeams()

    if (isLoading) {
        return <p>Cargando equipos...</p>;
    }

    if (error) {
        return <p>Error al cargar los equipos.</p>;
    }


    return (
        <>
            {data?.map((team) => {
                return (
                    <TeamCard key={team._id} team={team} />
                )
            })}
        </>
    )
}