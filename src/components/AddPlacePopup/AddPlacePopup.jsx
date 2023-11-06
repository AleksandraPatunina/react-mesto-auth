import useFormValidation from "../../hooks/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
// import Input from '../Input/Input'


export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {

  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

  function resetForClosePopup() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    //проверяем валидность данных перед вызовом onAddPlace
    if (isValid) {
      onAddPlace({ title: values.title, link: values.link }, reset);
    }
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onClose={resetForClosePopup}
      onSubmit={handleSubmit}
      isValid={isValid}
      isSend={isSend}
      
    >
      <input
        id="name-input"
        className={`popup__input popup__input_type_title  ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`} //красная полоска у импута(почему-то не работает)
        type="text"
        name="title"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        value={values.title ? values.title : ''}
        onChange={handleChange}
        disabled={isSend}
      />
      <span className="form__input-error name-input-error">{errors.title}</span>
      <input
        id="link"
        className={`popup__input popup__input_type_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error'}`} //красная полоска у импута(почему-то не работает)
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        minLength={2}
        maxLength={100}
        required=""
        value={values.link ? values.link : ''}
        onChange={handleChange}
        disabled={isSend}
      />
      <span className="form__input-error link-error">{errors.link}</span>
    </PopupWithForm>
  )
}