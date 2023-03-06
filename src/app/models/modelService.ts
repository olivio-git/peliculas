import { Genero } from "./genero"

export interface DataService{
    movies:any,
    movieDetail:any,
    user:any
    genres:Genero[],
    genresMovie:any
}