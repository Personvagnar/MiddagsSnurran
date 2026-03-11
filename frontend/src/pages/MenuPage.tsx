import ButtonMain from '../components/ButtonMain/ButtonMain';
import './pages.css';
import { useEffect, useState } from 'react';
import { getItems } from '../api/items';
import type { Item } from '../types/types';

function MenuPage() {
    const [items, setItems] = useState<Item[]>([]);

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
    </main>
  )
}

export default MenuPage;