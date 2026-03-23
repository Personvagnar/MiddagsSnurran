import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventInput } from '@fullcalendar/core';
import './calendar.css';

type Props = {
    events: EventInput[];
    onDateClick: (dateStr: string) => void;
    onEventClick: (dateStr: string) => void;
}

function Calendar({ events, onDateClick }: Props) {
    
    const handleDateClick = (arg: any) => {
        onDateClick(arg.dateStr);
        console.log(arg.dateStr);
    }
    const handleEventClick = (info: any) => {
  const date = info.event.start;
  if (!date) return;

  // Use local date string
  const dateStr = date.toLocaleDateString("sv-SE"); // "YYYY-MM-DD" format
  onDateClick(dateStr);
  console.log("Event clicked:", dateStr);
};

  return (
    <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
        }}
        eventClassNames="calendar-event"
        dayCellClassNames="calendar-day"    
        
        />
  )
}

export default Calendar;