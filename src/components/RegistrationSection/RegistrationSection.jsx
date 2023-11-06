import Form from "../Form/Form";
import { Link } from "react-router-dom";

export default function RegistrationSection({ name, children, onSubmit, isValid }) {

    return (
    <div className="login page__login">
        <h1 className="login__title">{name === 'signup' ? 'Регистрация' : 'Вход'}</h1>
        <Form
          name={name}
          titleButton={name === 'signup' ? 'Регистрация' : 'Войти'}
          children={children}
          onSubmit={onSubmit}
          isValid={isValid}
          
        />
        {name === 'signup' && <p className="login__subtitle"> Уже зарегистрированы? 
        <Link to={'/sign-in'} className='login__subtitle-link'> Войти</Link></p>}
      </div>
    )
  }
