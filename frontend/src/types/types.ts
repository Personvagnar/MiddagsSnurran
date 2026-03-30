export const PROTEIN_OPTIONS = ["Köttfärs", "Kyckling", "Kött", "Fläsk", "Veg", "Fisk", "Övrigt"] as const;
export type Protein = typeof PROTEIN_OPTIONS[number];
export const PROTEIN_COLORS: Record<Protein, string> = {
    "Köttfärs": "#8581d3",
    "Kyckling": "#4ab372",
    "Kött": "#ffc658",
    "Fläsk": "#eb8958",
    "Veg": "#579ead",
    "Fisk": "#92c436",
    "Övrigt": "#a12b2b",
}

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

export type SortType = "az" | "za" | "protein";
