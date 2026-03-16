import './addEditModal.css';

type Props = {
    closeModal: () => void;
};

function AddEditModal({closeModal}: Props) {
  return (
    <section className="background-blur">
    <section className="addeditmodal">
        <h2>Lägg till</h2>
        <p>bild</p>
        <section className="addedit-item">
            <h3>Namn:</h3>
            <input aria-label='text' type="text" />
        </section>
        <section className="addedit-item">
            <h3>Namn:</h3>
            <input aria-label='text' type="text" />
        </section>
        <section className="addedit-item">
            <h3>Namn:</h3>
            <input aria-label='text' type="text" />
        </section>
        <section className="addedit-item">
            <h3>Namn:</h3>
            <input aria-label='text' type="text" />
        </section>
        <section className="addedit-item">
            <button onClick={closeModal}>kryss</button>
            <button>ja</button>
        </section>
    </section>
    </section>
  )
}

export default AddEditModal