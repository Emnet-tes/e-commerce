import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userId: string | null;
}
const initialState: UserState = {
    userId: typeof window !== "undefined" ? localStorage.getItem("user")?.replace(/"/g, '') ?? null : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("user", action.payload);
            }
        },
        clearUserId: (state) => {
            state.userId = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
            }
        },
    },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer; 