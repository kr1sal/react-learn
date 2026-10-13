import { House } from "../models/houses";

export interface CharacterAbout {
    id: string,
    photo: string | null,
    name: string,
    gender: string,
    aliasNames: string,
    house: House,
    wands: string,
    bloodStatus: string,
    born: string,
    died: string,
    isFree: string,
    eyeColor: string,
    hairColor: string,
    height: string,
    wiki: string
}