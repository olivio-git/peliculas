import { Genero } from "./genero"
import { Pelicula } from "./modelPeliculas"

export interface DataService{
    movies:Pelicula[],
    movieDetail:any,
    user:any
    genres:Genero[],
    genresMovie:any,
    filterMovies:Pelicula[],
    filter:any
}