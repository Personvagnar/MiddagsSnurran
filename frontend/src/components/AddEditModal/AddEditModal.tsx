import { PROTEIN_OPTIONS, type Item, type Protein} from '../../types/types';
import './addEditModal.css';
import { useAddEditForm } from '../../hooks/useAddEditForm';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { useItems } from '../../hooks/addItem';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

type Props = {
    closeModal: () => void;
    mode: "add" | "edit"
    item?: Item;
};

const proteinOptions = PROTEIN_OPTIONS;


function AddEditModal({ closeModal, mode, item }: Props) {
    const [showConfirm, setShowConfirm] = useState(false);
    const { removeItem } = useItems();

    const handleDelete = async () => {
        if (!item?._id) return;
        await removeItem(item._id);
        setShowConfirm(false);
        closeModal();
    }

  const {
    name, setName,
    protein, setProtein,
    desc, setDesc,
    recipe, setRecipe,
    error,
    handleSubmit
  } = useAddEditForm({ item, mode, onClose: closeModal });


  return (
    <section className="background-blur">
    <form className="addeditmodal" onSubmit={handleSubmit}>
        <section className="title">
            <h2>{mode === 'add' ? "Lägg till:" : "Redigera"}</h2>
            <button aria-label='closeBtn' type='button' className='squareBtn' onClick={closeModal}><FaTimes/></button>
        </section>
        <section className="addedit-item">
            <h3>Namn:</h3>
            <input aria-label='name' value={name} onChange={(e) => setName(e.target.value)} required/>
        </section>
        <section className="addedit-item">
            <h3>Protein:</h3>
            <select aria-label='protein' value={protein} onChange={(e) => setProtein(e.target.value as Protein)} required>
                <option value="">Välj protein</option>
                {proteinOptions.map((p) => (
                    <option key={p} value={p}>
                        {p}
                    </option>
                ))}
            </select>
        </section>
        <section className="addedit-item">
            <h3>Beskrivning:</h3>
            <input aria-label='description' value={desc} onChange={(e) => setDesc(e.target.value)} required/>
        </section>
        <section className="addedit-item">
            <h3>Recept:</h3>
            <input aria-label='recipeurl' value={recipe} onChange={(e) => setRecipe(e.target.value)}/>
        </section>

        {error && <p className="form-error">{error}</p>}
        
        <section className="addedit-item">
            {mode != "add" ? <button aria-label='deleteBtn' type='button' className='squareBtn circleBtn circleBtn-red' onClick={() => {setShowConfirm(true)}}><FaTrash/></button> : undefined}
            {mode != "add" ? <button aria-label='editBtn' type='submit' className='squareBtn circleBtn circleBtn-green'><FaEdit/></button> : <button aria-label='addBtn' type='submit' className='squareBtn circleBtn circleBtn-green'><FaCheck/></button>}
        </section>
        {showConfirm && (
            <ConfirmationModal
                text={'Ta bort?'}
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleDelete}
            />
        )}
    </form>
    </section>
  )
}

export default AddEditModal