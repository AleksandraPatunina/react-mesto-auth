import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import SendContext from "../contexts/SendContext.js";
import ProtectedHomePage from "./ProtectedHomePage/ProtectedHomePage.jsx";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { auth, authorization, getUserData } from '../utils/auth.js'
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

//стейты для popup-ов
function App() {
  const navigate = useNavigate()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [SelectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)
  const [deletePopupOpen, setDeletePopupOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false)//открытие попапа InfoToolTip
  //стейт для контекста
  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState('')//для почты пользователя
  //стейты для карточки
  const [cards, setCards] = useState([])
  const [loadingCards, setLoadingCards] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')
  //стейт для регистрации
  const [loggedIn, setLoggedIn] = useState(false)//проверка,залогинин ли пользователь на данный момент на странице 
  const [isSuccessful, setIsSuccessful] = useState(false)//что отрисовываем в попапе InfoToolTip


  const setStateForcloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopup(false)
    setDeletePopupOpen(false)
    setInfoToolTipOpen(false)
  }, [])

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setStateForcloseAllPopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setStateForcloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setStateForcloseAllPopups()
    document.removeEventListener('keydown', closePopupByEsc)

  }, [setStateForcloseAllPopups, closePopupByEsc])

  function setEventListenerrForDocument() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerrForDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerrForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerrForDocument()
  }
  function handleDeletePopup(cardId) {
    setDeleteCardId(cardId)
    setDeletePopupOpen(true)
    setEventListenerrForDocument()
  }
  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
    setEventListenerrForDocument()
  }

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
        .then(res => {
          setUserEmail(res.data.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch(error => console.log(`Возникла ошибка авторизации при повторном входе ${error}`))
    }
    else {
      setLoggedIn(false)
    }
  }, [navigate])


  useEffect(() => {
    if (loggedIn) {
      setLoadingCards(true)
      Promise.all([api.getInfo(), api.getCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData)
          setCards(cardData)
          setLoadingCards(false)
        })
        .catch((error) =>
          console.error(`Возникла ошибка при начальной загрузке страницы ${error}`)
        );
    }
  }, [loggedIn]);




  function handleDeleteClick(evt) {
    evt.preventDefault()
    setIsSending(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId //если card._id не равен удаленной,то ее необходимо возвратить
        }))
        closeAllPopups()
        setIsSending(false)
      })
      .catch((error) =>
        console.error(`Возникла ошибка при попытке удалить карточку${error}`)
      )
      .finally(() => setIsSending(false))
  }

  function handleUpdateUser(userData, reset) {
    setIsSending(true)
    api.setUserInfo(userData)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error) =>
        console.error(`Возникла ошибка при редактировании профиля ${error}`)
      )
      .finally(() => setIsSending(false))
  }

  function handleUpdateAvatar(userData, reset) {
    setIsSending(true)
    api.setNewAvatarPicture(userData)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        // setIsSending(false)
      })
      .catch((error) =>
        console.error(`Возникла ошибка при редактировании аватара ${error}`)
      )
      .finally(() => setIsSending(false))
  }

  function handleAddCard(dataCard, reset) {
    setIsSending(true)
    api.addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])//первым элементом добавляем возвращенный с сервера объект+отрисовываются все остальные
        closeAllPopups()
        reset()
        setIsSending(false)
      })
      .catch((error) =>
        console.error(`Возникла ошибка при попытке добавления карточки ${error}`)
      )
      .finally(() => setIsSending(false))
  }

  //логин
  function handleLogin(password, email) {
    setIsSending(true)
    authorization(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        window.scrollTo(0, 0)//используем,чтобы не скролить страничку снизу вверх(когда залогинимся)
        navigate('/')
      })
      .catch(error => {
        setInfoToolTipOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при попытке авторизоваться ${error}`)
      })
      .finally(() => setIsSending(false))
  }

  //регистрация
  function handleRegister(password, email) {
    setIsSending(true)
    auth(password, email)
      .then(() => {
        setInfoToolTipOpen(true)
        setIsSuccessful(true)
        window.scrollTo(0, 0)//используем,чтобы не скролить страничку снизу вверх(когда пройдем регистрацию)
        navigate('/sign-in')
      })
      .catch((error) => {
        setInfoToolTipOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при попытке регистрации ${error}`)
      })
      .finally(() => setIsSending(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <SendContext.Provider value={isSending}>
          <Routes>       
            <Route path='/' element={<ProtectedRoute
              element={ProtectedHomePage}
              userEmail={userEmail}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onDelete={handleDeletePopup}
              onCardClick={handleCardClick}
              cards={cards}
              loadingCards={loadingCards}
              loggedIn={loggedIn}
            />
            } />
            <Route path='/sign-up' element={
              <>
                <Header name='signup' />
                <Main name='signup' handleRegister={handleRegister} />
              </>
            } />
            <Route path='/sign-in' element={
              <>
                <Header name='signin' />
                <Main name='signin' handleLogin={handleLogin} 
                />
              </>
            } />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </SendContext.Provider>

        <Footer />

        <SendContext.Provider value={isSending}>
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isSend={isSending}
          />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isSend={isSending}
          />

          <AddPlacePopup
            onAddPlace={handleAddCard}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isSend={isSending}
          />
          <PopupWithForm
            name='delete'
            title='Вы уверены?'
            titleButton='Да'
            isOpen={deletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleDeleteClick}
            isSend={isSending}
          />
        </SendContext.Provider>

        <ImagePopup card={SelectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />


        <InfoTooltip
          name='result'
          isSuccessful={isSuccessful}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
