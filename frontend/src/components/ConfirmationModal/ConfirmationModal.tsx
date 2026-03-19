import { FaCheck, FaTimes } from 'react-icons/fa';
import './confirmationModal.css';

type Props = {
    text: String;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmationModal({text, onConfirm, onCancel}: Props) {
  return (
    <section className='background-blur'>
        <section className="modal">
            <h2>{text}</h2>
            <aside>
                <button aria-label='cancelBtn' className='squareBtn circleBtn circleBtn-red' onClick={onCancel}><FaTimes/></button>
                <button aria-label='confirmBtn' className='squareBtn circleBtn circleBtn-green' onClick={onConfirm}><FaCheck/></button>
            </aside>
        </section>
    </section>
  )
}

export default ConfirmationModal