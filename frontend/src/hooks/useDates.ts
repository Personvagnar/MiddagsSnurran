import { useState, useCallback, useEffect } from "react";
import { getCalendarByMonth, getCalendarByDate, postCalendarEntry, putCalendarEntry, deleteCalendarEntry } from "../api/api";
import type { CalendarEntry } from "../types/types";

export function useDates(currentMonth: string) {
  const [monthEntries, setMonthEntries] = useState<CalendarEntry[]>([]);
  const [selectedItem, setSelectedItem] = useState<CalendarEntry | null>(null);

  const fetchMonth = useCallback(async () => {
    try {
      const entries = await getCalendarByMonth(currentMonth);
      setMonthEntries(entries);
    } catch (err) {
      console.error("Failed to fetch month", err);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchMonth();
  }, [fetchMonth]);

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
    await fetchMonth();
  };

  const removeDate = async (date: string) => {
    await deleteCalendarEntry(date);
    setMonthEntries(prev => prev.filter(entry => entry.date !== date));
    setSelectedItem(null);
  };

  return {
    monthEntries,
    selectedItem,
    setSelectedItem,
    fetchMonth,
    fetchSelectedDate,
    saveDate,
    removeDate
  };
}