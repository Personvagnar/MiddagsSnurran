import { addItem } from "../api/items";
import type { NewItem } from "../types/types";

export function useItems() {
    const createItem = async (item: NewItem) => {
        const newItem = await addItem(item)
        return newItem
    }

    return {createItem}
}