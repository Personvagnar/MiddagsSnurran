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
            <h5>{item.protein}</h5>
              {item.desc && (
                <>
                <p>Beskrivning:</p>
            <h5>{item.desc}</h5>
                </>
              )}
          </article>
        </section>
        <section className="expanded-footer">
        {item.recipe && (
          <>
            <p>Recept:</p>
            <a target='_blank'>{item.recipe}</a>
          </>
        )}
        </section>
    </section>
  )
}

export default MenuItem