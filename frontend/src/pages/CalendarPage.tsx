import './pages.css';
import Calendar from '../components/Calendar/Calendar';
import {useState, useEffect} from 'react';
import type { CalendarEntry } from '../types/types';
import { deleteCalendarEntry, getCalendarByDate, getCalendarByMonth } from '../api/api';
import { useCurrentMonth } from '../utils/getMonth';
import ButtonMain from '../components/ButtonMain/ButtonMain';
import { FaPencilAlt, FaPlus, FaTimes } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import AddEditDateModal from '../components/AddEditDateModal/AddEditDateModal';

function CalendarPage() {
  const [monthEntries, setMonthEntries] = useState<CalendarEntry[]>([]);
  const [currentMonth, setCurrentMonth] = useCurrentMonth();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CalendarEntry | null>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);

  async function handleDeleteConfirm() {
    if (!selectedDate) return;

    try {
      await deleteCalendarEntry(selectedDate);

      setMonthEntries(prev => prev.filter(entry => entry.date !== selectedDate));

      setSelectedDate(null);
      setSelectedItem(null);
      setConfirmModal(false);
    } catch(err) {
      console.error('Failed to delete')
      setConfirmModal(false);
    }
  }

  function handleDeleteCancel() {
    setConfirmModal(false);
  }

  function handleDateModal() {
    setDateModal(false);
  }

  useEffect(() => {
    async function fetchMonth() {
      try {
        const entries = await getCalendarByMonth(currentMonth);
        setMonthEntries(entries);
      } catch(err) {
        console.error('Failed to fetch calendar', err)
      }
    }
    fetchMonth();
  }, [currentMonth]);

  useEffect(() => {
    if (!selectedDate) return;

    async function fetchSelectedDate() {
      try {
        const entry = await getCalendarByDate(selectedDate!);
        setSelectedItem(entry);
      } catch (err) {
        console.error(err);
        setSelectedItem(null);
      }
    }
    fetchSelectedDate();
  }, [selectedDate]);

  function handleAddClick() {
    setDateModal(true)
  }
 
  return (
    <main>
        <section className="calendar">
            <Calendar
              events={(monthEntries ?? []).map(e => {
                let title = "Rätt";
                if (e.itemId) {
                  title = typeof e.itemId === "string" ? "Rätt" : e.itemId.name;
                }

                return {
                  id: e._id,
                  title,
                  start: e.date,
                  allDay: true
                };
              })}
              onDateClick={setSelectedDate}
              onEventClick={setSelectedDate}
            />
        </section>
        {selectedDate && (
          <footer>
            <section className="calendar-footer">
            <article>
              <h4>Måndag</h4>
              <p>{selectedDate}</p>
            </article>
            <ButtonMain 
              text={selectedItem ? selectedItem.itemId.name : 'Lägg till'} 
              onClick={selectedItem ? handleAddClick : handleAddClick}
              leftIcon={selectedItem ? <FaTimes/> : undefined}
              onLeftIconClick={selectedItem ? () => setConfirmModal(true) : undefined}
              rightIcon={selectedItem ? <FaPencilAlt/> : <FaPlus size={24}/>}
              onRightIconClick={selectedItem ? handleAddClick : handleAddClick}
              />
          </section>
          </footer>
        )}
        {confirmModal && selectedItem && (
          <ConfirmationModal
            text={`Ta bort ${selectedItem.itemId.name} från ${selectedDate}?`}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
        {dateModal && selectedDate && (
          <AddEditDateModal closeModal={handleDateModal} mode='add' date={selectedDate!}/>
        )}
    </main>
)}

export default CalendarPage;