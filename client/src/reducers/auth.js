import { AUTH, LOGOUT } from '../constants/actionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH: 
            console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            console.log({ ...state, authData: action?.data });
            return { ...state, authData: action?.data };
            // console.log(state);
            // return state;
        default:
            return state;
    }
};

export default authReducer;