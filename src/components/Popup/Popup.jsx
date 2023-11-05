//делаем отдельный блок popup,чтобы не было повторений кода в ImagePopup и  PopupWithForm
export default function Popup({ name, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className={`${name === 'image' ? 'popup__picture-gallery' : 'popup__container'} ${name === 'result' ? 'popup__container_type_registration' : ''}`}
                onClick={(evt => evt.stopPropagation())}> {/*добавляем запрет всплытия */}
                <button
                    className="popup__button-close"
                    type="button"
                    title="Закрыть"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    )
}
