import { FaRandom, FaPencilAlt, FaCalendarAlt } from 'react-icons/fa'
import ButtonMain from '../components/ButtonMain/ButtonMain.tsx';
import './pages.css';

function HomePage() {
  return (
    <main>
        <section className='homepage'>
            <ButtonMain text='Slumparen' onClick={() => {console.log('main')}} rightIcon={<FaRandom />}/>
            <ButtonMain text='Meny' onClick={() => {}} rightIcon={<FaPencilAlt />}/>
            <ButtonMain text='VeckoPlaneraren' onClick={() => {}} rightIcon={<FaCalendarAlt />} />
        </section>
    </main>
  )
}

export default HomePage