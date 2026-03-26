import { FaCalendarAlt, FaRandom } from 'react-icons/fa';
import { getItems } from '../api/api';
import ButtonMain from '../components/ButtonMain/ButtonMain';
import MenuItem from '../components/MenuItem/MenuItem';
import type { Item } from '../types/types';
import './pages.css';
import { useState, useEffect } from 'react';
import { useRandomItem } from '../hooks/useRandomItem';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';


function SlumparenPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const { randomItem, isAnimating, randomize } = useRandomItem(items);
    const [confirmModal, setConfirmModal] = useState(false);

    useEffect(() => {
        getItems().then(setItems).catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (items.length > 0) {
            randomize();
        }
    }, [items])
    
    function handleConfirmClick() {
        if (!randomItem) return;
        navigate('/calendar', {state: { selectedItem: randomItem }});
    }

  return (
    <main>
        <section className='slumparen'>
            {isAnimating && <figure className='main-img main-img-slumparen'><img src="/Ellipse 1.png" alt="Main decoartive" /></figure>}

            {!isAnimating && randomItem && (
                <>
                <section className='slumparen-content'>
                <ButtonMain text={randomItem.name} onClick={() => {}} onRightIconClick={() => setConfirmModal(true)} rightIcon={<FaCalendarAlt/>} />
                <MenuItem item={randomItem} isOpen={true}/>
                </section>
                <footer>
                <ButtonMain text='Slumpa igen' rightIcon={<FaRandom />} onClick={randomize}/>
                </footer>
                </>
            )}
            {confirmModal && (
                <ConfirmationModal text='Lägg till i dagens datum?' onCancel={() => setConfirmModal(false)} onConfirm={handleConfirmClick} />
            )}
        </section>
      
    </main>
  )
}

export default SlumparenPage