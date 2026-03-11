export type Protein = "Köttfärs" | "Kyckling" | "Veg" | "Fisk"

export interface Item {
    _id: string
    name: string
    protein: Protein
    desc?: string
    img?: string
    recipe?: string
}