import { useEffect, useState } from 'react';
import './addEditDateModal.css';
import type { Item } from '../../types/types';
import { getItems, postCalendarEntry, putCalendarEntry } from '../../api/api';
import { FaCheck, FaTimes } from 'react-icons/fa';
import '../AddEditModal/addEditModal.css';

type Props = {
    closeModal: (updated?: boolean) => void;
    mode: "add" | "edit"
    date: string;
    entryId?: string;
};

function AddEditDateModal({ closeModal, mode, date, entryId}: Props) {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    async function fetchItems() {
      try {
        const res = await getItems();
        setItems(res);
        if (res.length > 0) setSelectedItemId(res[0]._id);
      } catch (err) {
        console.error('Failed to fetch items', err);
      }
    }
    fetchItems();
  }, []);

   async function handleConfirm() {
    if (!selectedItemId) return;
    setLoading(true);

    try {
      if (mode === 'add') {
        await postCalendarEntry(date, selectedItemId);
      } else if (mode === 'edit' && entryId) {
        await putCalendarEntry(entryId, selectedItemId);
      }

      closeModal(true);
    } catch (err) {
      console.error('Failed to add entry', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="background-blur">
        <section className="addeditmodal">
            <section className="title">
                <h2>{mode === 'add' ? "Lägg till:" : "Ändra"}</h2>
                <button aria-label='closeBtn' type='button' className='squareBtn' onClick={() => closeModal(false)}><FaTimes/></button>
            </section>

        <section className='addedit-item'>
          <select
              title='select'
              id="itemSelect"
              value={selectedItemId}
              onChange={e => setSelectedItemId(e.target.value)}
            >
            {items.map(item => (
              <option key={item._id} value={item._id}>
                {item.name} ({item.protein})
              </option>
            ))}
          </select>
        </section>

        <section className="addedit-item">
          <button aria-label='confirmBtn' type='button' className='squareBtn circleBtn circleBtn-green' onClick={handleConfirm} disabled={loading}>
            <FaCheck/>
          </button>
        </section>

        </section>
    </section>
  )
}

export default AddEditDateModal