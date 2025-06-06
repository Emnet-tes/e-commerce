import { auth } from "@/firebase/clientApp";
import Cookies from "js-cookie";

export const setAuthToken = (token: string) => {
    // Store in cookie for middleware
    Cookies.set("auth-token", token, { expires: 7 }); // Expires in 7 days
    // Store in localStorage for client-side access
    localStorage.setItem("auth-token", token);
};

export const getAuthToken = () => {
    return Cookies.get("auth-token");
};

export const removeAuthToken = () => {
    Cookies.remove("auth-token");
    localStorage.removeItem("auth-token");
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const signOut = async () => {
    try {
        await auth.signOut();
        removeAuthToken();
    } catch (error) {
        console.error("Error signing out:", error);
    }
}; 