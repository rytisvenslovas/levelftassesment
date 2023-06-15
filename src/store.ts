import {createStore, applyMiddleware, combineReducers} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// Reducers
import employeesReducer from './Redux/Reducers/employeesReducer'

const reducer = combineReducers({
    employees: employeesReducer
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
    // composeWithDevTools(
    //     applyMiddleware(thunk)
    // )
);

export default store

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch