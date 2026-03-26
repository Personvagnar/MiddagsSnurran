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
            <li><Link to="/slumparen" onClick={onClose}>Slumparen</Link></li>
            <li><Link to="/menu" onClick={onClose}>Meny</Link></li>
            <li><Link to="/calendar" onClick={onClose}>VeckoPlaneraren</Link></li>
        </ul>
        <button aria-label="closeModal" type="button" className="squareBtn closeBtn header-nav" onClick={onClose}><FaTimes/></button>
    </section>
  )
}

export default NavModal