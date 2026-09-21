export const HOUSES = ["gryffindor", "hufflepuff", "ravenclaw", "slytherin"] as const;

export type House = typeof HOUSES[number];

export function isHouse(value: unknown): value is House {
    return typeof value === "string" && (HOUSES as readonly string[]).includes(value);
}

export default HOUSES;
