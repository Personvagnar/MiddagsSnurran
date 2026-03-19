import { useState } from "react";
import type { Item } from "../types/types";
import { getRandomItem } from "../utils/randomizeItem";

export function useRandomItem(items: Item[]) {
    const [randomItem, setRandomItem] = useState<Item | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const randomize = () => {
        if (items.length === 0) return;

        setIsAnimating(true);

        setTimeout(() => {
            const item = getRandomItem(items);
            setRandomItem(item);
            setIsAnimating(false);
        }, 3000);
    };

    return { randomItem, isAnimating, randomize };
}