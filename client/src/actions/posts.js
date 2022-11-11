import * as api from '../api/index.js';

// Action Creators (functions that return an action)
// an action is just an object that has the type and the payload
// with redux thunk, since we will be dealing with asynchronous logic, we have to add at this async dispatch function in front of it. Then instead of returning the action, we have to dispatch it.
export const getPosts = () => async (dispatch) => {
    try {
        // const action = { type: 'FETCH_ALL', payload: [] }
        // dispatch(action);
        const { data } = await api.fetchPosts();
        console.log(data);
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
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

export const updatePost = (id, post) => async (dispatch) => {
    try {
       const { data } = await api.updatePost(id, post);

       dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
       await api.deletePost(id);

       dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}