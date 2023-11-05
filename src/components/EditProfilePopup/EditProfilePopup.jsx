import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
    const currentUser = useContext(CurrentUserContext);// Подписка на контекст
    const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
        setValue("username", currentUser.name)
        setValue("job", currentUser.about)
    }, [currentUser, setValue])

    function resetForClosePopup() {
        onClose()
        reset({ username: currentUser.name, job: currentUser.about })//сохраняем значения импутов при закрытии попапа
    }

    //функция обработки отправки формы
    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({ username: values.username, job: values.job }, reset)
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={resetForClosePopup}//отрабатывает при клике на крестик закрытия формы
            isValid={isValid}
            isSend={isSend}
            onSubmit={handleSubmit}

        >
            <input
                id="title-input" //"username"
                className={`popup__input popup__input_type_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_type_error'}`} //красная полоска у импута
                type="text"
                name="username"
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                required
                value={values.username ? values.username : ''}
                onChange={handleChange}
                disabled={isSend}
            />
            <span className="form__input-error title-input-error">{errors.username}</span>
            <input
                id="subtitle-input"
                className={`popup__input popup__input_type_job ${isInputValid.job === undefined || isInputValid.job ? '' : 'popup__input_type_error'}`} //красная полоска у импута
                type="text"
                name="job"
                placeholder="О себе"
                minLength={2}
                maxLength={200}
                required
                value={values.job ? values.job : ''}
                onChange={handleChange}
                disabled={isSend}
            />
            <span className="form__input-error subtitle-input-error">{errors.job}</span>
        </PopupWithForm>
    )
}