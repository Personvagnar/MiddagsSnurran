import './menuItem.css';
import type { Item } from '../../types/types';

type Props = {
  item: Item;
}

function MenuItem({item}: Props) {
  return (
    <section className="item-expanded">
        <section className="expanded-row0">
          <figure>
              {item.img && <img src={item.img} alt={item.name} />}
          </figure>
          <article>
              <p>Protein:</p>
            <span>{item.protein}</span>
              {item.desc && (
                <>
                <p>Beskrivning:</p>
            <span>{item.desc}</span>
                </>
              )}
          </article>
        </section>
        <section className="expanded-footer">
        {item.recipe && (
          <>
            <p>Recept:</p>
            <span>{item.recipe}</span>
          </>
        )}
        </section>
    </section>
  )
}

export default MenuItem