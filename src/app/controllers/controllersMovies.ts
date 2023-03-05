import { Pelicula } from '../models/modelPeliculas';
const urls={
    getAllPeliculas:'https://angularproject-bb97e-default-rtdb.firebaseio.com/Peliculas/Peliculas.json',
    urlImages:'https://image.tmdb.org/t/p/w500'
}
export const getAllMovies=(http:any)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            await http.get(urls.getAllPeliculas).subscribe((data:any)=>{
                
                let allMovies:Pelicula[]=[];
                data.forEach((movie:Pelicula)=>{
                    movie.backdrop_path=urls.urlImages+movie.backdrop_path;
                    movie.poster_path=urls.urlImages+movie.poster_path;
                    allMovies.push(movie)
                })
                resolve(allMovies)
            })
        } catch (error) {
                reject(error);
        }
    })
    }
export const getAllGenres=(page:any)=>{
    return new Promise((resolve,reject)=>{
        try {
                
        } catch (error) {
                
        }
    })
}

