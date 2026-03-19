import type { Item } from "../types/types";


export function getRandomItem(items: Item[]): Item | null {
    if (items.length === 0) return null;
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}