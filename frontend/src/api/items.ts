import type { Item } from "../types/types";

const API_URL = 'http://localhost:5000/api/items'

export async function getItems(): Promise<Item[]> {
    const res = await fetch(API_URL)
    return res.json()
}