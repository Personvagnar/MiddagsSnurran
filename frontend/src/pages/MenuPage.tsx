import ButtonMain from '../components/ButtonMain/ButtonMain';
import './pages.css';
import { useEffect, useState } from 'react';
import { getItems } from '../api/items';
import type { Item } from '../types/types';
import AddEditModal from '../components/AddEditModal/AddEditModal';
import { FaPlus } from 'react-icons/fa';
import MenuItem from '../components/MenuItem/MenuItem';

function MenuPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

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
                        onClick={() => setExpandedItemId(prev =>
                            prev === item._id ? null : item._id
                        ) }/>
                    {expandedItemId === item._id && <MenuItem item={item} />}
                    </section>
                ))
            )}
        </section>
        <aside className="addBtn">
            <button aria-label='addBtn' onClick={() => {setIsAddModalOpen(true)}}>
                <FaPlus size={30} color='blue'/>
            </button>
        </aside>
        {isAddModalOpen && (
            <AddEditModal closeModal={() => setIsAddModalOpen(false)} />
        )}
    </main>
  )
}

export default MenuPage;