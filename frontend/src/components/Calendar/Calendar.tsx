import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventInput } from '@fullcalendar/core';
import { useState } from 'react';
import './calendar.css';
import ButtonMain from '../ButtonMain/ButtonMain';
import MenuItem from '../MenuItem/MenuItem';

type Props = {
    onClick?: (dateStr: string) => void;
}

function Calendar({ onClick }: Props) {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    
    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr);

        if (onClick) onClick(arg.dateStr);

        /*const title = prompt('Vilken maträtt vill du lägga till?');
        if (title) {
            setEvents([...events, {title, start:arg.dateStr, allDay: true}]);
        }*/
    }

  return (
    <>
    <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        selectable={true}
        dateClick={handleDateClick}
        events={events}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
        }}
        eventClassNames="calendar-event"
        dayCellClassNames="calendar-day"    
        
        />

        {selectedDate && (
            <footer>
                <section className="calendar-footer">
                    <article>
                        <h4>{selectedDate}</h4>
                        <p>{selectedDate}</p>
                    </article>
                    <ButtonMain text='mat' onClick={() => {}}/>
                </section>
            </footer>
        )}
        </>
  )
}

export default Calendar;