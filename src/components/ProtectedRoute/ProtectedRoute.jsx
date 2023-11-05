import { Navigate } from "react-router-dom";

// в element:component придет ProtectedHomePage
export default function ProtectedRoute({ element: Component, loggedIn, ...props }) {
  return (
    loggedIn ?
      <Component {...props} />
      :
      <Navigate to={'/sign-in'} replace />
  )
}