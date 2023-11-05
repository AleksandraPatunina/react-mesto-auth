import { memo } from "react"
import Popup from "../Popup/Popup"

const ImagePopup = memo(({ card, isOpen, onClose }) => {
    return (
        <Popup
            name='image'
            isOpen={isOpen}
            onClose={onClose}
        >
            <figure className="popup__figure">
                <img
                    className="popup__picture"
                    src={card?.link}
                    alt={card.name ? `Картинка ${card.name}` : '#'}
                />
                <figcaption className="popup__picture-description">{card.name}</figcaption>
            </figure>
        </Popup>
    )
})

export default ImagePopup

