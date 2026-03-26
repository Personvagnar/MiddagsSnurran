import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventInput } from '@fullcalendar/core';
import svLocale from '@fullcalendar/core/locales/sv';
import { useState } from 'react';

import './calendar.css';

type Props = {
    events: EventInput[];
    onDateClick: (dateStr: string) => void;
    onEventClick: (dateStr: string) => void;
}

function Calendar({ events, onDateClick }: Props) {
    const [currentView, setCurrentView] = useState('dayGridMonth');
    
    const handleDateClick = (arg: any) => {
        onDateClick(arg.dateStr);
    }

    const handleEventClick = (info: any) => {
        const date = info.event.start;
        if (!date) return;

        const dateStr = date.toLocaleDateString("sv-SE");
    onDateClick(dateStr);
    };

  return (
    <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        locale={svLocale}
        contentHeight="auto"
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        weekNumbers={true}
        events={events}
        datesSet={(arg) => setCurrentView(arg.view.type)}
        dayHeaderFormat={{ day: 'numeric'}}
        headerToolbar={{
            left: currentView === 'dayGridMonth'
            ? 'prev,next,dayGridWeek'
            : 'prev,next,dayGridMonth',
            center: '',
            right: 'title'
        }}
        eventClassNames="calendar-event"
        dayCellClassNames="calendar-day"    
        />
  )
}

export default Calendar;