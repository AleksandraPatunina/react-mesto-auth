import { useCallback, useState } from "react";

export default function useFormValidation() {
    const [values, setValues] = useState({}) //пустой объект (для значений)
    const [errors, setErrors] = useState({})//стейт для ошибки
    const [isValid, setIsValid] = useState(false) //булевый стейт для кнопки
    const [isInputValid, setIsInputValid] = useState({})//стейт для красного подчеркивания

    function handleChange(evt) {
       //  console.log(isValid)
        const name = evt.target.name //name инпута
        const value = evt.target.value //значение поля импута
        const validationMessage = evt.target.validationMessage
        const valid = evt.target.validity.valid //либо true, либо false
        const form = evt.target.form //отвечает за валидность всей формы

        setValues((otherValues)=>{
            return{...otherValues, [name]: value}
        })

        setErrors((oldErrorMessage)=>{
            return{...oldErrorMessage, [name]: validationMessage}//...oldErrorMessage-диструктуризация
        })

        setIsInputValid((oldIsInputValid)=>{
            return{...oldIsInputValid, [name]: valid}
        })

        setIsValid(form.checkValidity())
        // Добавить проверку на валидацию поля и обновление errors.username
   }
//возвращаем начальные значения(по умолчанию пустой объект)
function reset (data={}){
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
}

const setValue =  useCallback((name, value)=>{
    setValues((otherValues)=>{
        return{...otherValues, [name]: value}
    })

},[])

    return { values, errors, isValid, isInputValid, handleChange, reset,setValue }
}