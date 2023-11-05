import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"


export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSend}) {
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()
const input = useRef()

    function resetForClosePopup(){
        onClose()
        reset()
    }

    function handleSubmit(evt){
        evt.preventDefault()
          //проверяем валидность данных перед вызовом onUpdateAvatar
        if (isValid){
        onUpdateAvatar({avatar: input.current.value}, reset)
    }
}

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            isSend={isSend}
            onClose={resetForClosePopup}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <input
            ref={input}
                id="avatar"
                className={`popup__input popup__input_type_link popup__input_edit-profile ${isInputValid.avatar === undefined ||  isInputValid.avatar ? '' : 'popup__input_type_error'}`} //красная полоска у импута(почему-то не работает)
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                required=""
                value={values.avatar ? values.avatar : ''}
                disabled={isSend}
                onChange={handleChange}
            />
            <span className="form__input-error form__input-error_type_avatar avatar-error">{errors.avatar}</span>
        </PopupWithForm>
    )
}
