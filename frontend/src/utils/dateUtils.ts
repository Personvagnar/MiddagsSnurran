const weekdaysSv = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];

export function getWeekdaySv(dateStr: string): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return weekdaysSv[date.getDay()];
}

export function getLastNdays(days: number) {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - days);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return {from: formatDate(from), to: formatDate(to)};
}