import { useState } from "react";
import { useItems } from "./addItem";
import type { NewItem, Protein, Item } from "../types/types";

type Props = {
  item?: Item;
  mode: "add" | "edit";
  onClose: () => void;
};

export function useAddEditForm({ item, mode, onClose }: Props) {
  const { createItem, editItem } = useItems();

  const [name, setName] = useState(item?.name ?? "");
  const [protein, setProtein] = useState<Protein | "">(item?.protein ?? "");
  const [desc, setDesc] = useState(item?.desc ?? "");
  const [recipe, setRecipe] = useState(item?.recipe ?? "");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !protein || !desc.trim()) {
      setError("Alla fält måste fyllas i");
      return;
    }

    const formItem: NewItem = {
      name: name.trim(),
      protein: protein as Protein,
      desc: desc.trim(),
      recipe: recipe.trim(),
    };

    try {
      if (mode === "add") {
        await createItem(formItem);
      }
      if (mode === "edit" && item?._id) {
        await editItem(item._id, formItem);
      }

      onClose();
      window.location.reload();
    } catch {
      setError("Kunde inte spara item");
    }
  };

  return {
    name, setName,
    protein, setProtein,
    desc, setDesc,
    recipe, setRecipe,
    error,
    handleSubmit
  };
}