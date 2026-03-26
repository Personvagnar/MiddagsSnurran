import type { Item, NewItem } from "../types/types";

//const ITEMS_URL = 'https://middagssnurran.onrender.com/api/items'
//const CALENDAR_URL = 'https://middagssnurran.onrender.com/api/calendar'
const ITEMS_URL = 'http://localhost:5000/api/items'
const CALENDAR_URL = 'http://localhost:5000/api/calendar'

export async function getItems(): Promise<Item[]> {
    const res = await fetch(ITEMS_URL)
    return res.json()
}

export async function addItem(item: NewItem): Promise<Item> {
    const res = await fetch(ITEMS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
    return res.json();
}

export async function updateItem(id: string, item: Partial<Item>): Promise<Item> {
    const res = await fetch(`${ITEMS_URL}/${id}`, {
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
    const res = await fetch(`${ITEMS_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error('Kunde inte ta bort item');
    }
}

//Calendar API
export async function getCalendarByDate(date: string) {
  const res = await fetch(`${CALENDAR_URL}/${date}`);
  if (!res.ok) throw new Error('Failed to fetch date');
  const data = await res.json();
  return data;
}

export async function getCalendarAll() {
  const res = await fetch(`${CALENDAR_URL}/all`);
  if (!res.ok) throw new Error("Failed to fetch calendar entries");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function postCalendarEntry(date: string, itemId: string) {
  const res = await fetch(CALENDAR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, itemId }),
  });
  return res.json();
}

export async function putCalendarEntry(id: string, itemId: string) {
  const res = await fetch(`${CALENDAR_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });
  return res.json();
}

export async function deleteCalendarEntry(date: string) {
  const res = await fetch(`${CALENDAR_URL}/${date}`, { method: "DELETE" });
  return res.json();
}