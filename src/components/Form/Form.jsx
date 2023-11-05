import { useContext } from "react";
import SendContext from '../../contexts/SendContext'

export default function Form({ name, titleButton, children, isValid, onSubmit }) {
    const isSend = useContext(SendContext)

    return (
        <form noValidate name={name} onSubmit={onSubmit}>
            {children}
            {name === 'signin' || name === 'signup' ?
                <button className={`login__button ${isSend ? 'login__button_loading' : ''} ${isValid ? '' : 'login__button_disable'} `}>
                    {isSend ? '' : titleButton || 'Сохранить'}
                </button>
                :
                <button className={`popup__submit-button ${isSend ? 'popup_submit-button_loading' : ''} ${isValid ? '' : 'popup__submit-button_type_inactive'}`}
                    // type="submit"
                    // disabled={isSend}
                    >
                    {isSend ? '' : titleButton || 'Сохранить'}
                </button>
            }
        </form>
    )
}