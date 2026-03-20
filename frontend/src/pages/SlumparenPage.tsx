import { FaCalendarAlt, FaRandom } from 'react-icons/fa';
import { getItems } from '../api/api';
import ButtonMain from '../components/ButtonMain/ButtonMain';
import MenuItem from '../components/MenuItem/MenuItem';
import type { Item } from '../types/types';
import './pages.css';
import { useState, useEffect } from 'react';
import { useRandomItem } from '../hooks/useRandomItem';

function SlumparenPage() {
    const [items, setItems] = useState<Item[]>([]);
    const { randomItem, isAnimating, randomize } = useRandomItem(items);

    useEffect(() => {
        getItems().then(setItems).catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (items.length > 0) {
            randomize();
        }
    }, [items])

  return (
    <main>
        <section className='slumparen'>
            {isAnimating && <figure className='main-img main-img-slumparen'><img src="/Ellipse 1.png" alt="Main decoartive" /></figure>}

            {!isAnimating && randomItem && (
                <>
                <section className='slumparen-content'>
                <ButtonMain text={randomItem.name} onClick={() => {}} rightIcon={<FaCalendarAlt/>} />
                <MenuItem item={randomItem} isOpen={true}/>
                </section>
                <footer>
                <ButtonMain text='Slumpa igen' rightIcon={<FaRandom />} onClick={randomize}/>
                </footer>
                </>
            )}
        </section>
      
    </main>
  )
}

export default SlumparenPage