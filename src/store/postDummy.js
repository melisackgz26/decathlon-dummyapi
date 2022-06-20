import axios from '../axiosIns';

export const READ_POST_PENDING = 'DUMMY_API_PROJECT/POST/READ_POST_PENDING';
export const READ_POST_SUCCEEDED = 'DUMMY_API_PROJECT/POST/READ_POST_SUCCEEDED';
export const READ_POST_FAILED = 'DUMMY_API_PROJECT/POST/READ_POST_FAILED';

const initialState = {
    data: {},
    isLoading: false,
    error: '',
};

// reducer
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_POST_PENDING:
            return { ...state, isLoading: true, error: '' };
        case READ_POST_SUCCEEDED:
            return { ...state, isLoading: false, data: action.payload };
        case READ_POST_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

// actions
export const readPost = (id) => async (dispatch, getState) => {
    // get current state
    const { data, isLoading } = getState().post;

    // return if post data is already loading
    if (isLoading) return;
    // don't re-request post data if a post with this id has already been requested and there is data in state
    if (data.id === id) return;

    dispatch({ type: READ_POST_PENDING });

    try {
        const response = await axios.get(`post/${id}`);
        dispatch({ type: READ_POST_SUCCEEDED, payload: response.data });
    } catch (err) {
        dispatch({ type: READ_POST_FAILED, payload: err });
    }
};

// selectors
export const postSelector = (state) => state.post;

// reducer is exported by default
export default postReducer;