import { Matiere } from "./matiere.model";
import { User } from "./user.dto";

export interface Assignment {
    _id?: string ;
    nom?: string ;
    auteur?: string ;
    matiere? : string ;
    note?: number;
    remarque?: string;
    dateRendu?: Date;
    rendu?:boolean
}
