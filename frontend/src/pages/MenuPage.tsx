import ButtonMain from '../components/ButtonMain/ButtonMain';
import './pages.css';
import { useEffect, useState } from 'react';
import { getItems } from '../api/items';
import type { Item } from '../types/types';
import AddEditModal from '../components/AddEditModal/AddEditModal';
import { FaPlus } from 'react-icons/fa';

function MenuPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        getItems().then(setItems).catch(err => console.error(err))
    }, [])

  return (
    <main>
        <section className='menu'>
            {items.length === 0 ? (
                <p>loading menu...</p>
            ) : (
                items.map(item => (
                    <ButtonMain 
                        key={item._id} 
                        text={item.name} 
                        onClick={() => {} }/>
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