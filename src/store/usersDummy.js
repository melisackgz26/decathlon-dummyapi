import axios from '../axiosIns';

export const READ_USERS_PENDING = 'DUMMY_API_PROJECT/USERS/READ_USERS_PENDING';
export const READ_USERS_SUCCEEDED =
    'DUMMY_API_PROJECT/USERS/READ_USERS_SUCCEEDED';
export const READ_USERS_FAILED = 'DUMMY_API_PROJECT/USERS/READ_USERS_FAILED';

const initialState = {
    data: [],
    isLoading: false,
    error: '',
};

// reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case READ_USERS_PENDING:
            return { ...state, isLoading: true, error: '' };
        case READ_USERS_SUCCEEDED:
            return { ...state, isLoading: false, data: action.payload };
        case READ_USERS_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

// actions
export const readUsers = () => async (dispatch, getState) => {
    // get current state
    const { data, isLoading } = getState().users;

    // return if users data is already loading
    if (isLoading) return;
    // don't re-request users data if it has already been requested and there is data in state
    if (data.length) return;

    dispatch({ type: READ_USERS_PENDING });

    try {
        const response = await axios.get('/user');
        dispatch({ type: READ_USERS_SUCCEEDED, payload: response.data.data });
    } catch (err) {
        dispatch({ type: READ_USERS_FAILED, payload: err });
    }
};

// selectors
export const usersSelector = (state) => state.users;

// reducer is exported by default
export default usersReducer;