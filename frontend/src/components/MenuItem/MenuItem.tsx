import './menuItem.css';
import type { Item } from '../../types/types';
import { isValidUrl } from '../../utils/validateRecipe';

type Props = {
  item: Item;
  isOpen: boolean;
}

function MenuItem({item, isOpen}: Props) {

  return (
    <section className={isOpen ? "item-expanded open" : "item-expanded"}>
        <section className="expanded-main">
            <p>Protein:</p>
            <h5>{item.protein}</h5>
              {item.desc && (
                <>
            <p>Beskrivning:</p>
            <h5>{item.desc}</h5>
                </>
              )}
        </section>
        <section className="expanded-footer">
        {item.recipe?.trim() && isValidUrl(item.recipe) && (
          <>
            <p>Recept:</p>
            <a href={item.recipe} target='_blank' rel='noopener noreferrer'>{item.recipe}</a>
          </>
        )}
        </section>
    </section>
  )
}

export default MenuItem