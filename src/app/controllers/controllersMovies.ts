import { Pelicula } from '../models/modelPeliculas';
const urls={
    getAllPeliculas:'https://angularproject-bb97e-default-rtdb.firebaseio.com/Peliculas/Peliculas.json',
    urlImages:'https://image.tmdb.org/t/p/w500',
    getAllGenres:'https://angularproject-bb97e-default-rtdb.firebaseio.com/Peliculas/genres.json',
    getMovieKey:'https://angularproject-bb97e-default-rtdb.firebaseio.com/Peliculas/Peliculas/',
    postMovieCart:'https://angularproject-bb97e-default-rtdb.firebaseio.com/Usuarios/',
    deleteCarMovie:'https://angularproject-bb97e-default-rtdb.firebaseio.com/Usuarios/'
}
export const getAllMovies=(http:any)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            await http.get(urls.getAllPeliculas).subscribe((data:Pelicula[])=>{
                let movies = Object.entries(data).map(([key, value]) => ({ ...value, key }));
                let allMovies:Pelicula[]=[];
                movies.forEach((movie:Pelicula)=>{
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
export const GetMovie=(http:any,key:any)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            await http.get(`https://angularproject-bb97e-default-rtdb.firebaseio.com/Peliculas/Peliculas/${key}.json`).subscribe((data:Pelicula)=>{
                let movie:Pelicula = { ...data, key };
                movie.backdrop_path=urls.urlImages+movie.backdrop_path;
                movie.poster_path=urls.urlImages+movie.poster_path;
                resolve(movie)
            })
        }catch(error){
            reject(error);
        }
    })
}
export const getAllGenres=(http:any)=>{
    return new Promise((resolve,reject)=>{
        try {
                http.get(urls.getAllGenres).subscribe((data:any)=>{
                resolve(data)
            })
        } catch (error) {
                reject(error);
        }
    })
}
export const postMovieCar=(http:any,pelicula:Pelicula,key:any)=>{
    return new Promise((resolve,reject)=>{
        if(pelicula && key){
            try {
                http.post(urls.postMovieCart+key+'/movies.json',pelicula).subscribe((response:any)=>{
                    resolve('Agregado exitosamente!')
                })
            } catch (error) {
                reject(error)
            }
        }else{
            reject(Error('Todos los datos son requeridos'));
        }
    })
}
export const deleteCarMovie=(http:any,keyUser:any,keyMovie:any)=>{
    return new Promise((resolve,reject)=>{
        if(keyUser && keyMovie){
            try {
                http.delete(urls.deleteCarMovie+keyUser+'/movies/'+keyMovie+'.json').subscribe((response:any)=>{
                    resolve('Eliminación completa!')
                })
            } catch (error) {
                reject(error)
            }
        }
        else{
            reject(Error('Todos los datos son requeridos'));
        }
    })
}



