export type Protein = "Köttfärs" | "Kyckling" | "Veg" | "Fisk" | "Övrigt"

export interface Item {
    _id: string
    name: string
    protein: Protein
    desc?: string
    recipe?: string
}

export type NewItem = Omit<Item, "_id">

export interface CalendarEntry {
    _id: string
    date: string
    itemId: Item;
}

export type NewCalendarEntry = Omit<CalendarEntry, "_id">