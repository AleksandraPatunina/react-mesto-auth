import { memo, useContext } from "react"
import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Spinner from "../Spinner/Spinner.jsx"
import Register from '../Register/Register'
import Login from '../Login/Login'


//В зависимости от name будем отрисовывать раздел основной контент/signin/signup
const Main = memo(({ name, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards, loadingCards, handleLogin, handleRegister }) => {
    const currentUser = useContext(CurrentUserContext)
    return (
        <main className="main-content">
            {name === 'main-content' ?
                <>
                    <section className="profile">
                        <button
                            className="profile__avatar-edit"
                            type="button"
                            title="Обновить аватар"
                            onClick={onEditAvatar}
                        >
                            <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар" />
                        </button>
                        <div className="profile__info">
                            <h1 className="profile__info-title">{currentUser.name ? currentUser.name : ''}</h1>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                            <p className="profile__info-subtitle">{currentUser.about ? currentUser.about : ''}</p>
                        </div>
                        <button className="profile__add-button" type="button" onClick={onAddPlace} />
                    </section>
                    <section className="elements">
                        <ul className="elements__items">
                            {loadingCards ? <Spinner /> : cards.map(data => {
                                return (
                                    <li className="element" key={data._id}>
                                        <Card card={data} onCardClick={onCardClick} onDelete={onDelete} />
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                </>
                :
                name === 'signup' ?
                    <Register name={name} handleRegister={handleRegister} />
                    :
                    <Login name={name} handleLogin={handleLogin} />
            }
        </main>
    )
})

export default Main
