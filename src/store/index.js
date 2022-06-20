import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import postReducer from './postDummy';
import postsReducer from './postsDummy';
import userReducer from './userDummy';
import usersReducer from './usersDummy';

const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const rootReducer = combineReducers({
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
    post: postReducer,
});
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);