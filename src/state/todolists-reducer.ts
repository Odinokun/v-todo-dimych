import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../App';

export type ActionRemoveTodo = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type ActionAddTodo = {
  type: 'ADD-TODOLIST';
  title: string;
};
export type ActionEditTodoName = {
  type: 'EDIT-TODOLIST-NAME';
  id: string;
  title: string;
};
export type ActionChangeTodoFilter = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterType;
};

type Actions = ActionRemoveTodo | ActionAddTodo | ActionEditTodoName | ActionChangeTodoFilter;

export const todolistsReducer = (state: TodolistType[], action: Actions): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      return [{ id: v1(), title: action.title, filter: 'all' }, ...state];
    case 'EDIT-TODOLIST-NAME':
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl));
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter as FilterType } : tl));
    default:
      throw new Error('I don`t understand this type');
  }
};

// begin ACTION CREATORS
export const RemoveTodoAC = (todolistId: string): ActionRemoveTodo => ({
  type: 'REMOVE-TODOLIST',
  id: todolistId,
});
export const AddTodoAC = (title: string): ActionAddTodo => ({ type: 'ADD-TODOLIST', title });
export const EditTodoNameAC = (id: string, title: string): ActionEditTodoName => ({
  type: 'EDIT-TODOLIST-NAME',
  id,
  title,
});
export const ChangeTodoFilterAC = (id: string, filter: FilterType): ActionChangeTodoFilter => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id,
  filter,
});
