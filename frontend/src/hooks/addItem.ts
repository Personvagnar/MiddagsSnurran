import { addItem, deleteItem, updateItem } from "../api/api";
import type { NewItem } from "../types/types";

export function useItems() {
    const createItem = async (item: NewItem) => {
        return await addItem(item)
    };

    const editItem = async (id: string, item: Partial<NewItem>) => {
        return await updateItem(id, item);
    };

    const removeItem = async (
        id: string, onSuccess?: () => void) => {

        try {
            await deleteItem(id);
            onSuccess?.();
        } catch(err) {
            console.error(err);
        }
    }

    return {createItem, editItem, removeItem};
}