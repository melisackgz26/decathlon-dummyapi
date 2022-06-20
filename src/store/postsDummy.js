import axios from '../axiosIns';

export const READ_POSTS_PENDING = 'DUMMY_API_PROJECT/POSTS/READ_POSTS_PENDING';
export const READ_POSTS_SUCCEEDED =
    'DUMMY_API_PROJECT/POSTS/READ_POSTS_SUCCEEDED';
export const READ_POSTS_FAILED = 'DUMMY_API_PROJECT/POSTS/READ_POSTS_FAILED';

const initialState = {
    data: [],
    isLoading: false,
    error: '',
};

// reducer
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_POSTS_PENDING:
            return { ...state, isLoading: true, error: '' };
        case READ_POSTS_SUCCEEDED:
            return { ...state, isLoading: false, data: action.payload };
        case READ_POSTS_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

// actions
export const readPosts = () => async (dispatch, getState) => {
    // get current state
    const { data, isLoading } = getState().posts;

    // return if posts data is already loading
    if (isLoading) return;
    // don't re-request posts data if it has already been requested and there is data in state
    if (data.length) return;

    dispatch({ type: READ_POSTS_PENDING });

    try {
        const response = await axios.get('/post');
        dispatch({ type: READ_POSTS_SUCCEEDED, payload: response.data.data });
    } catch (err) {
        dispatch({ type: READ_POSTS_FAILED, payload: err });
    }
};

// selectors
export const postsSelector = (state) => state.posts;

// reducer is exported by default
export default postsReducer;