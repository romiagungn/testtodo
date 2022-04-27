import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../redux/action';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});
