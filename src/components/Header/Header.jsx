import { useEffect, useState } from 'react';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom';

function Header({ name, dataUser }) {
  const [count, setCount] = useState(0)

  function handleClick(){
    count === 0 ? setCount(1): setCount(0)
  }

  //ремувим localStorage при нажатии на кнопку Выход
  function onExit() {
    setCount(0);
    localStorage.removeItem('jwt')
  }
  //сбрасываем настройки отступов, если у устройства перевернут экран
useEffect(()=>{
function closeBurgerMenu(){ 
  //ширина клиентского окна
  if (document.documentElement.clientWidth > '768') {
        setCount(0)
        window.removeEventListener('resize', closeBurgerMenu)
      }
    }
    if (count === 1) {
      window.addEventListener('resize', closeBurgerMenu)
      return()=>  window.removeEventListener('resize', closeBurgerMenu)
}
},[count])

  return (
    <header className={`header ${count !== 0 ? 'header__opened' : ''}`}>
      <img
        className="header__logo"
        src={logo}
        alt="логотип Место Россия"
      />
      {name === 'signup' || name === 'signin' ?
        <Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className="header__link">
          {name === 'signup' ? 'Войти' : 'Регистрация'}
        </Link> 
        :
        <>
          <div className={`header__email-container ${count !== 0 ? 'header__email-container_opened' : ''}`}>
            <p className='header__email'>{dataUser}</p>
            <Link to={`/sign-in`} className='header__nologged' onClick={onExit}>Выйти</Link>
          </div>
          <button className={`header__button ${count !== 0 ? 'header__button_type_active' : ''}`} onClick={handleClick}></button>
        </>
      }
    </header>
  )
}

export default Header;

