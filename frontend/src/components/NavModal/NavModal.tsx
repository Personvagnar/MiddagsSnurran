import { FaTimes } from "react-icons/fa";
import './navModal.css';
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
}

function NavModal({open, onClose}: Props) {
  if (!open) return null;
  return (
    <section className="navmodal">
        <ul className="navmodal-list">
            <li><Link to="/" onClick={onClose}>Hem</Link></li>
            <li>andra</li>
            <li>tredje</li>
        </ul>
        <button aria-label="closeModal" type="button" className="squareBtn closeBtn header-nav" onClick={onClose}><FaTimes/></button>
    </section>
  )
}

export default NavModal