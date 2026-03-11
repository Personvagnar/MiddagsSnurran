import { FaRandom, FaPencilAlt, FaCalendarAlt } from 'react-icons/fa'
import ButtonMain from '../components/ButtonMain/ButtonMain.tsx';
import './pages.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
        <section className='homepage'>
            <ButtonMain text='Slumparen' onClick={() => {console.log('main')}} rightIcon={<FaRandom />}/>
            <ButtonMain text='Meny' onClick={() => navigate('/menu')} rightIcon={<FaPencilAlt />}/>
            <ButtonMain text='VeckoPlaneraren' onClick={() => {}} rightIcon={<FaCalendarAlt />} />
        </section>
    </main>
  )
}

export default HomePage