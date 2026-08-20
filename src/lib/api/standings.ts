import { Standing } from "@/types/standings"


export const fetchStandings = async (category?: string): Promise<Standing[]> => {
    try {
        const query = category ? `?category=${encodeURIComponent(category)}` : "";
        const response = await fetch(`/api/standings${query}`)

        const data = await response.json()
        
        if(!response.ok){
            throw new Error("Error al obtener standings")
        }   
        return data.data
    } catch (error) {
        console.log(error)
        throw error
    }
}