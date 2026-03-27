import './pages.css';
import Calendar from '../components/Calendar/Calendar';
import {useState, useEffect} from 'react';
import ButtonMain from '../components/ButtonMain/ButtonMain';
import { FaPencilAlt, FaPlus, FaTimes } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import AddEditDateModal from '../components/AddEditDateModal/AddEditDateModal';
import { useDates } from '../hooks/useDates';
import { getWeekdaySv } from '../utils/dateUtils';
import { useLocation } from 'react-router-dom';

function CalendarPage() {
  const location = useLocation();
  const incomingItem = location.state?.selectedItem;

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(today);
  const [confirmModal, setConfirmModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const {monthEntries, selectedItem, fetchAll, saveDate, fetchSelectedDate, removeDate} = useDates();

  useEffect(() => {
    if (!selectedDate) return;
    fetchSelectedDate(selectedDate);
  }, [selectedDate, fetchSelectedDate]);

  function handleAddClick(mode: 'add' | 'edit') {
    setModalMode(mode);
    setDateModal(true)
  }

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (!incomingItem) return;

    const today = new Date().toISOString().split('T')[0];
    async function handleAdd() {
      const existing = await fetchSelectedDate(today);
      if (existing) {
        await saveDate(today, incomingItem._id, "edit", existing._id);
      } else {
        await saveDate(today, incomingItem._id, "add");
      }
      setSelectedDate(today);
    }
    handleAdd();
  }, [incomingItem]);
 
  return (
    <main>
        <section className="calendar">
            <Calendar
              events={(monthEntries ?? []).map(e => {
                let title = "Rätt";
                let proteinClass = '';
                if (e.itemId) {
                  title = typeof e.itemId === "string" ? "Rätt" : e.itemId.name;
                }

                switch (e.itemId.protein) {
                  case "Köttfärs":
                    proteinClass = "mincedmeat";
                    break;
                  case "Kyckling":
                    proteinClass = "chicken";
                    break;
                  case "Fisk":
                    proteinClass = "fish";
                    break;
                  case "Veg":
                    proteinClass = "veg";
                    break;
                  case "Övrigt":
                    proteinClass = "other";
                    break;
                  case "Fläsk":
                    proteinClass = "pork";
                    break;
                  case "Kött":
                    proteinClass = "meat";
                    break;
                }

                return {
                  id: e._id,
                  title,
                  start: e.date,
                  allDay: true,
                  classNames: [proteinClass]
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
              <h4>{getWeekdaySv(selectedDate)}</h4>
              <p>{selectedDate}</p>
            </article>
            <ButtonMain 
              text={selectedItem ? selectedItem.itemId.name : 'Lägg till'} 
              onClick={() => handleAddClick(selectedItem ? 'edit' : 'add')}
              leftIcon={selectedItem ? <FaTimes/> : undefined}
              onLeftIconClick={selectedItem ? () => setConfirmModal(true) : undefined}
              rightIcon={selectedItem ? <FaPencilAlt/> : <FaPlus size={24}/>}
              onRightIconClick={() => handleAddClick(selectedItem ? 'edit' : 'add')}
              />
          </section>
          </footer>
        )}
        {confirmModal && selectedItem && (
          <ConfirmationModal
            text={`Ta bort ${selectedItem.itemId.name} från ${selectedDate}?`}
            onConfirm={async () => { if(selectedDate) await removeDate(selectedDate); setConfirmModal(false); await fetchAll(); setSelectedDate(null)}}
            onCancel={() => {setConfirmModal(false); setSelectedDate(null);}}
          />
        )}
        {dateModal && selectedDate && (
          <AddEditDateModal 
            closeModal={async (updated?: boolean) => {setDateModal(false); if(updated) await fetchAll(); setSelectedDate(null)}} 
            mode={modalMode} 
            date={selectedDate} 
            entryId={selectedItem?._id}
            />
        )}
    </main>
)}

export default CalendarPage;