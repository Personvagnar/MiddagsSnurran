import { useState, useCallback } from "react";
import { getCalendarByDate, postCalendarEntry, putCalendarEntry, deleteCalendarEntry, getCalendarAll } from "../api/api";
import type { CalendarEntry } from "../types/types";

export function useDates() {
  const [monthEntries, setMonthEntries] = useState<CalendarEntry[]>([]);
  const [selectedItem, setSelectedItem] = useState<CalendarEntry | null>(null);

  const fetchAll = useCallback(async () => {
  try {
    const entries = await getCalendarAll();
    setMonthEntries(entries);
  } catch (err) {
    console.error("Failed to fetch calendar", err);
  }
}, []);

  const fetchSelectedDate = useCallback(async (date: string): Promise<CalendarEntry | null> => {
    try {
      const entry = await getCalendarByDate(date);
      setSelectedItem(entry);
      return entry;
    } catch (err) {
      console.error("Failed to fetch selected date", err);
      setSelectedItem(null);
      return null;
    }
  }, []);

  const saveDate = async (date: string, itemId: string, mode: "add" | "edit", entryId?: string) => {
    if (mode === "add") {
      await postCalendarEntry(date, itemId);
    } else if (mode === "edit" && entryId) {
      await putCalendarEntry(entryId, itemId);
    }
    await fetchAll();
  };

  const removeDate = async (date: string) => {
    await deleteCalendarEntry(date);
    await fetchAll();
    setSelectedItem(null);
  };

  return {
    monthEntries,
    selectedItem,
    setSelectedItem,
    fetchSelectedDate,
    saveDate,
    removeDate,
    fetchAll
  };
}