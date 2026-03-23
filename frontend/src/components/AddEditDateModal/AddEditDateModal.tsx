import { useEffect, useState } from 'react';
import './addEditDateModal.css';
import type { Item } from '../../types/types';
import { getItems, postCalendarEntry } from '../../api/api';
import { FaTimes } from 'react-icons/fa';

type Props = {
    closeModal: () => void;
    mode: "add" | "edit"
    date: string;
};

function AddEditDateModal({ closeModal, mode, date}: Props) {
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
        const res = await postCalendarEntry(date, selectedItemId);
        closeModal();
    } catch (err) {
      console.error('Failed to add entry', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="background-blur">
        <section className="dateModal">
            <section className="title">
                <h2>{mode === 'add' ? "Lägg till:" : "Redigera"}</h2>
                <button aria-label='closeBtn' type='button' className='squareBtn' onClick={closeModal}><FaTimes/></button>
            </section>

        <label htmlFor="itemSelect">Välj maträtt:</label>
        <select
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

        <div className="modal-buttons">
          <button onClick={closeModal} disabled={loading}>Avbryt</button>
          <button onClick={handleConfirm} disabled={loading}>
            Lägg till
          </button>
        </div>

        </section>
    </section>
  )
}

export default AddEditDateModal