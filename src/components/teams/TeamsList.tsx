"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useStandings } from "@/hooks/useStandings"
import { useTeams } from "@/hooks/useTeams"
import { TeamCard } from "./TeamCard"

function TeamCardSkeleton() {
    return (
        <div className="relative flex flex-col overflow-hidden rounded-xl border border-card-border bg-card p-5">
            <div className="relative mb-auto flex flex-col items-center gap-3 lg:flex-row">
                <Skeleton className="size-[52px] shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 text-center lg:text-left">
                    <Skeleton className="mx-auto h-4 w-32 lg:mx-0 lg:w-36" />
                    <Skeleton className="mx-auto mt-2 h-3 w-24 lg:mx-0 lg:w-28" />
                </div>
            </div>
            <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="text-center">
                        <Skeleton className="mx-auto h-6 w-8" />
                        <Skeleton className="mx-auto mt-2 h-2.5 w-10" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export const TeamsList = () => {
    const {
        data: teams,
        isLoading: teamsLoading,
        error: teamsError,
        refetch,
    } = useTeams()
    const {
        data: standings,
        isLoading: standingsLoading,
        refetch: standingsRefetch,
    } = useStandings()

    const loading = teamsLoading || (standingsLoading && !standings)

    if (loading) {
        return (
            <>
                {Array.from({ length: 8 }).map((_, index) => (
                    <TeamCardSkeleton key={index} />
                ))}
            </>
        )
    }

    if (teamsError) {
        return (
            <div className="col-span-full flex flex-col items-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
                <p className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground">
                    Error al cargar los clubes
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Revisá la conexión e intentá de nuevo.
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    className="mt-5"
                    onClick={() => {
                        refetch()
                        standingsRefetch()
                    }}
                >
                    Reintentar
                </Button>
            </div>
        )
    }

    if (!teams || teams.length === 0) {
        return (
            <div className="col-span-full rounded-xl border border-dashed border-border px-6 py-16 text-center">
                <p className="text-sm text-muted-foreground">
                    No hay clubes cargados todavía.
                </p>
            </div>
        )
    }

    return (
        <>
            {teams.slice(0,8).map((team) => {
                const standing = standings?.find(
                    (row) => row.team._id === team._id
                )
                return (
                    <TeamCard key={team._id} team={team} standing={standing} />
                )
            })}
        </>
    )
}