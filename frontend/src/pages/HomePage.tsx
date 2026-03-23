import { FaRandom, FaPencilAlt, FaCalendarAlt } from 'react-icons/fa'
import ButtonMain from '../components/ButtonMain/ButtonMain.tsx';
import './pages.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
      <figure className='main-img main-img-rotate'>
        <img src="/Ellipse 1.png" alt="Main decoartive" />
      </figure>
        <section className='homepage'>
            <ButtonMain text='Slumparen' onClick={() => navigate('/slumparen')} rightIcon={<FaRandom />}/>
            <ButtonMain text='Meny' onClick={() => navigate('/menu')} rightIcon={<FaPencilAlt />} onRightIconClick={() => navigate('/menu')} onLeftIconClick={() => navigate('/menu')}/>
            <ButtonMain text='VeckoPlaneraren' onClick={() => navigate('/calendar')} rightIcon={<FaCalendarAlt />} onRightIconClick={() => navigate('/calendar')} onLeftIconClick={() => navigate('/calendar')}/>
        </section>
      
    </main>
  )
}

export default HomePage