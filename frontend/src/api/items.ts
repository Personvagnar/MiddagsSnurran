import type { Item, NewItem } from "../types/types";

const API_URL = 'http://localhost:5000/api/items'

export async function getItems(): Promise<Item[]> {
    const res = await fetch(API_URL)
    return res.json()
}

export async function addItem(item: NewItem): Promise<Item> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    return res.json();
}