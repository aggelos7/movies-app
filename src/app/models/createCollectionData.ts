import { Movie } from "./movie";

export interface CreateCollectionData{
    title: string;
    description: string;
    movies: Movie[]
}