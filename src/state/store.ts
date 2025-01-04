import { combineReducers, createStore } from 'redux';
import { todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';

export type AppRootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);

// store.getState(); => show the state in console
store.subscribe(() => {
  console.log('state was changed => ', store.getState());
});
