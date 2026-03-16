export type Protein = "Köttfärs" | "Kyckling" | "Veg" | "Fisk" | "Övrigt"

export interface Item {
    _id: string
    name: string
    protein: Protein
    desc?: string
    img?: string
    recipe?: string
}

export type NewItem = Omit<Item, "_id">