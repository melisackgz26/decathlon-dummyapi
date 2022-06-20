import axios from '../axiosIns';

export const READ_USER_PENDING = 'DUMMY_API_PROJECT/USER/READ_USER_PENDING';
export const READ_USER_SUCCEEDED = 'DUMMY_API_PROJECT/USER/READ_USER_SUCCEEDED';
export const READ_USER_FAILED = 'DUMMY_API_PROJECT/USER/READ_USER_FAILED';

const initialState = {
    data: {},
    isLoading: false,
    error: '',
};

// reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_USER_PENDING:
            return { ...state, isLoading: true, error: '' };
        case READ_USER_SUCCEEDED:
            return { ...state, isLoading: false, data: action.payload };
        case READ_USER_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

// actions
export const readUser = (id) => async (dispatch, getState) => {
    // get current state
    const { data, isLoading } = getState().user;

    // return if user data is already loading
    if (isLoading) return;
    // don't re-request user data if a user with this id has already been requested and there is data in state
    if (data.id === id) return;

    dispatch({ type: READ_USER_PENDING });

    try {
        const response = await axios.get(`user/${id}`);
        dispatch({ type: READ_USER_SUCCEEDED, payload: response.data });
    } catch (err) {
        dispatch({ type: READ_USER_FAILED, payload: err });
    }
};

// selectors
export const userSelector = (state) => state.user;

// reducer is exported by default
export default userReducer;