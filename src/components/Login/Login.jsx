import RegistrationSection from '../RegistrationSection/RegistrationSection';
import useFormValidation from '../../hooks/useFormValidation';
import Input from '../Input/Input';

export default function Login({ handleLogin, name}) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

    function onLogin(evt) {
        evt.preventDefault()
        handleLogin(values.password, values.email)
    }

    return (
        <RegistrationSection name={name} onSubmit={onLogin} isValid={isValid}>
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