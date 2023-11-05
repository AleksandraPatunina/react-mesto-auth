import Header from "../Header/Header";
import Main from "../Main/Main";


export default function ProtectedHomePage({ userEmail, ...props }) {
    return (
        <>
            <Header dataUser={userEmail} />
            <Main name='main-content'
                {...props}
            />
        </>
    )
}