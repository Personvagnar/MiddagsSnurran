import type { Item, Protein} from '../../types/types';
import './addEditModal.css';
import { useAddEditForm } from '../../hooks/useAddEditForm';

type Props = {
    closeModal: () => void;
    mode: "add" | "edit"
    item?: Item;
};

const proteinOptions: Protein[] = ["Köttfärs", "Kyckling", "Veg", "Fisk", "Övrigt"]

function AddEditModal({ closeModal, mode, item }: Props) {
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
        <h2>{mode === 'add' ? "Lägg till:" : "Redigera"}</h2>
       {mode === 'edit' ? <figure> <img src={item?.img ?? ''} alt={item?.img ?? ''}/> </figure> : null}
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
            <h3>Övrigt:</h3>
            <input aria-label='description' value={desc} onChange={(e) => setDesc(e.target.value)} required/>
        </section>
        <section className="addedit-item">
            <h3>Recept:</h3>
            <input aria-label='recipeurl' value={recipe} onChange={(e) => setRecipe(e.target.value)} required/>
        </section>

        {error && <p className="form-error">{error}</p>}
        
        <section className="addedit-item">
            <button type='button' onClick={closeModal}>kryss</button>
            <button type='submit'>Spara</button>
        </section>
    </form>
    </section>
  )
}

export default AddEditModal