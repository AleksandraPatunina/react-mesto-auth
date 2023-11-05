import Popup from "../Popup/Popup";
import Form from '../Form/Form'
export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isSend, isValid=true}) {
  return(
    <Popup 
    name={name}
      isOpen={isOpen}
      onClose={onClose}>
        <h2 className={`popup__title ${name === 'delete' && 'popup__title_delete'}`}>{title}</h2>
        <Form
        name={name}
        titleButton={titleButton}
        children= {children}
        isSend={isSend}
        isValid={isValid}
        onSubmit={onSubmit}
      />
      </Popup>
  )
}
