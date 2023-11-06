import RegistrationSection from "../RegistrationSection/RegistrationSection";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";


export default function Register({ handleRegister,name }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

    function onRegister(evt) {
        evt.preventDefault()
        handleRegister(values.password, values.email)
    }

    return (
        <RegistrationSection name={name} onSubmit={onRegister} isValid={isValid}>
            <Input
                name='email'
                type='email'
                placeholder={'Email'}
                value={values.email}
                onChange={handleChange}
                isInputValid={isInputValid.email}
                error={errors.email}
            />
            <Input
                name='password'
                type='password'
                placeholder={'Пароль'}
                minLength={2}
                value={values.password}
                onChange={handleChange}
                isInputValid={isInputValid.password}
                error={errors.password}
            />
        </RegistrationSection>
    )
}