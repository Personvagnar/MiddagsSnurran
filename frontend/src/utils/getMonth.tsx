import { useState } from "react";

export function useCurrentMonth(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [currentMonth, setCurrentMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  return [currentMonth, setCurrentMonth];
}