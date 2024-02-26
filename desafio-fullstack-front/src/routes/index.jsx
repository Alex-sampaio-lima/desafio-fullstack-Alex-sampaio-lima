import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { ErrorPage } from "../pages/ErrorPage"
import { DashBoardPage } from "../pages/DashBoardPage"
import { ProtectedRoutes } from "../pages/ProtectedRoutes"


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoutes />}>
                <Route index element={<DashBoardPage />} />
            </Route >
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    )
}