import ButtonMain from '../components/ButtonMain/ButtonMain';
import './pages.css';
import { useEffect, useState } from 'react';
import { getItems } from '../api/api';
import type { Item } from '../types/types';
import AddEditModal from '../components/AddEditModal/AddEditModal';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import MenuItem from '../components/MenuItem/MenuItem';

function MenuPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        getItems().then(setItems).catch(err => console.error(err))
    }, [])

  return (
    <main>
        <figure className='main-img'>
        <img src="/Ellipse 1.png" alt="Main decoartive" />
      </figure>
        <section className='menu'>
            {items.length === 0 ? (
                <p>loading menu...</p>
            ) : (
                items.map(item => (
                    <section key={item._id}>
                        <ButtonMain 
                            text={item.name} 
                            rightIcon={expandedItemId === item._id ? <FaPencilAlt /> : undefined}
                            onRightIconClick={expandedItemId === item._id ? () => {
                                setSelectedItem(item); 
                                setModalMode("edit");
                                setModalOpen(true);
                            } : undefined}
                            onClick={() => setExpandedItemId(prev =>
                                prev === item._id ? null : item._id
                            ) }/>
                        {expandedItemId === item._id && <MenuItem item={item} />}
                    </section>
                ))
            )}
        </section>
        <aside className="addBtn">
            <button aria-label='addBtn' onClick={() => {setSelectedItem(null); setModalMode("add"); setModalOpen(true)}}>
                <FaPlus size={30} color='blue'/>
            </button>
        </aside>
        {modalMode && (
            <AddEditModal
                mode={modalMode}
                item={selectedItem ?? undefined}
                closeModal={() => {
                    setModalMode(null); 
                    setSelectedItem(null);
                }} />
        )}
    </main>
  )
}

export default MenuPage;