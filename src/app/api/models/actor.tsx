import { House } from "./houses";

export default interface Actor {
    id: string,
    role: string,
    actorName: string,
    gender: string,
    house: House,
    wandCore: string,
    alive: string
} 