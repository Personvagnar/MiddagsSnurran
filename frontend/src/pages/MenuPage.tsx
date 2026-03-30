import ButtonMain from '../components/ButtonMain/ButtonMain';
import './pages.css';
import { useEffect, useState } from 'react';
import { getItems } from '../api/api';
import type { Item, SortType } from '../types/types';
import AddEditModal from '../components/AddEditModal/AddEditModal';
import { FaCalendarAlt, FaPencilAlt, FaPlus } from 'react-icons/fa';
import MenuItem from '../components/MenuItem/MenuItem';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import FilterBar from '../components/FilterBar/FilterBar';


function MenuPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [sortType, setSortType] = useState<SortType>("az");

    const sortedItems = [...items].sort((a, b) => {
        if (sortType === "az") {
            return a.name.localeCompare(b.name);
        }
        if (sortType === "za") {
            return b.name.localeCompare(a.name);
        }
        if (sortType === "protein") {
            return a.protein.localeCompare(b.protein);
        }
        return 0;
    });

    const grouped = sortedItems.reduce((acc, item) => {
    if (!acc[item.protein]) acc[item.protein] = [];
    acc[item.protein].push(item);
    return acc;
    }, {} as Record<Item["protein"], Item[]>);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        getItems()
        .then(setItems)
        .catch(err => console.error(err));
        };

    function handleCalendarClick() {
        if (!selectedItem) return;
        setConfirmModal(false);
        navigate('/calendar', {state: { selectedItem }});
        fetchItems();
    }

    const renderedItem = (item: Item) => (
        <section key={item._id}>
            <ButtonMain 
                text={item.name} 
                rightIcon={expandedItemId === item._id ? <FaPencilAlt /> : undefined}
                onRightIconClick={expandedItemId === item._id ? () => {
                    setSelectedItem(item); 
                    setModalMode("edit");
                    setModalOpen(true);
                } : undefined}
                leftIcon={expandedItemId === item._id ? <FaCalendarAlt /> : undefined}
                onLeftIconClick={expandedItemId === item._id ? () => {
                    setSelectedItem(item);
                    setConfirmModal(true);
                } : undefined}
                onClick={() => setExpandedItemId(prev =>
                    prev === item._id ? null : item._id
                )}
            />
            {expandedItemId === item._id && (
                <MenuItem item={item} isOpen={true} />
            )}
        </section>
    )


  return (
    <main>
        <figure className='main-img main-img-rotate'>
            <img src="/Ellipse 1.png" alt="Main decoartive" />
      </figure>
        <section className='menu'>
            {items.length === 0 ? (
                <p className='loading'>loading menu...</p>
            ) : (
                <>
                    <FilterBar
                        currentSort={sortType}
                        onSortAZ={() => setSortType("az")}
                        onSortZA={() => setSortType("za")}
                        onSortProtein={() => setSortType("protein")}
                    />

                    {sortType === "protein" ? (
                        Object.entries(grouped).map(([protein, groupItems]) => (
                            <section key={protein}>
                                <h3 className='group-title'>{protein}</h3>
                                {groupItems.map(renderedItem)}
                            </section>
                        ))
                    ) : (
                        sortedItems.map(renderedItem)
                    )}
                </>
            )}
        </section>
        <aside className="addBtn">
            <button aria-label='addBtn' type='button' onClick={() => {setSelectedItem(null); setModalMode("add"); setModalOpen(true)}}>
                <FaPlus size={30}/>
            </button>
        </aside>
        {confirmModal && (
            <ConfirmationModal text='Lägg till i dagens datum?' onCancel={() => setConfirmModal(false)} onConfirm={handleCalendarClick}/>
        )}
        {modalMode && modalOpen && (
            <AddEditModal
                mode={modalMode}
                item={selectedItem ?? undefined}
                closeModal={() => {
                    setModalMode(null); 
                    setSelectedItem(null);
                    fetchItems();
                }} />
        )}
    </main>
  )
}

export default MenuPage;