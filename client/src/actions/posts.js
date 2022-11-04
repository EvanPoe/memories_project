import * as api from '../api/index.js';

// Action Creators (functions that return an action)
// an action is just an object that has the type and the payload
// with redux thunk, since we will be dealing with asynchronous logic, we have to add at this async dispatch function in front of it. Then instead of returning the action, we have to dispatch it.
export const getPosts = () => async (dispatch) => {
    try {
        // const action = { type: 'FETCH_ALL', payload: [] }
        // dispatch(action);
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}