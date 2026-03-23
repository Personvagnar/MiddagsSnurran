import type { Item, NewItem } from "../types/types";

//const API_URL = 'https://middagssnurran.onrender.com/api/items'
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
    console.log(res);

    return res.json();
}

export async function updateItem(id: string, item: Partial<Item>): Promise<Item> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (!res.ok) {
        throw new Error('Kunde inte uppdatera');
    }
    return res.json();
}

export async function deleteItem(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error('Kunde inte ta bort item');
    }
}