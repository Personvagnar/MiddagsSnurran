import './menuItem.css';
import type { Item } from '../../types/types';

type Props = {
  item: Item;
}

function MenuItem({item}: Props) {
  return (
    <section className="item-expanded">
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
        {item.recipe && (
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