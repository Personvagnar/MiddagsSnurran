import { FaSortAlphaDownAlt, FaSortAlphaUpAlt, FaUtensils } from 'react-icons/fa';
import './filterBar.css';

type Props = {
    currentSort: "az" | "za" | "protein";
    onSortAZ: () => void;
    onSortZA: () => void;
    onSortProtein: () => void;
}

function FilterBar({ currentSort, onSortAZ, onSortZA, onSortProtein}: Props) {
  return (
    <section className="filter-bar">
        <button className={currentSort === "az" ? "active squareBtn" : "squareBtn"} aria-label='Sort a-z' type='button' onClick={onSortAZ}><FaSortAlphaDownAlt/></button>
        <button className={currentSort === "za" ? "active squareBtn" : "squareBtn"} aria-label='Sort z-a' type='button' onClick={onSortZA}><FaSortAlphaUpAlt/></button>
        <button className={currentSort === "protein" ? "active squareBtn" : "squareBtn"} aria-label='Sort protein' type='button' onClick={onSortProtein}><FaUtensils/></button>
    </section>
  )
}

export default FilterBar