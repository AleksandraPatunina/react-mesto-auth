import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Likes from "../Likes/Likes"

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)
    // Вывод содержимого currentUser._id в консоль
     // console.log("Значение currentUser._id:", currentUser._id);
    
    return (
        <article className="elements__element">
            <img
                className="element__photo"
                src={card.link}
                alt={`Картинка ${card.name}`}
                onClick={() => onCardClick({ link: card.link, name: card.name })}
            />
            {currentUser._id === card.owner._id && <button className="element__delete" type="button" onClick={() => onDelete(card._id)} />}
            <div className="element__group">
                <h2 className="element__photo-name">{card.name}</h2>
                <div className="element__like-container">
                    <Likes likes={card.likes} myid={currentUser._id} cardid={card._id} />
                </div>
            </div>
        </article>
    )
}