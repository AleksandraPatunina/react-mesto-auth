import { useEffect, useState } from "react"
import api from "../../utils/api"

export default function Likes({ likes, myid, cardid }) {
    const [isLike, setIsLike] = useState(false)
    const [counter, setCounter] = useState(likes.length)

    useEffect(() => {
        setIsLike(likes.some(item => myid === item._id))
    }, [likes, myid])

    function handleLike() {
        if (isLike) {
            api.deleteLike(cardid)
                .then(res => {
                    setIsLike(false)
                    setCounter(res.likes.length)
                })
                .catch((err) => console.error(`Ошибка при попытке удаления лайка ${err}`))
        }
        else {
            api.addLike(cardid)
                .then(res => {
                    setIsLike(true)
                    setCounter(res.likes.length)
                })
                .catch((err) => console.error(`Возникла ошибка при попытке поставить лайк ${err}`))
        }
    }

    return (
        <>
            <button className={`element__like-button ${isLike ? 'element__like-button_type_active' : ''}`} type="button" onClick={handleLike} />
            <p className="element__like-counter">{counter}</p>
        </>
    )
}