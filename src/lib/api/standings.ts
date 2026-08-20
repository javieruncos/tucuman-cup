import { Standing } from "@/types/standings"


export const fetchStandings = async ():Promise<Standing[]> =>{
    try {
        const response = await fetch(`/api/standings`) 

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