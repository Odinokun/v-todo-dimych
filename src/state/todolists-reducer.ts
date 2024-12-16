import { v1 } from 'uuid';
import { FilterType, TodolistType } from '../App';

export type ActionRemoveTodo = {
  type: 'REMOVE-TODO';
  id: string;
};
export type ActionAddTodo = {
  type: 'ADD-TODO';
  title: string;
};
export type ActionEditTodoName = {
  type: 'EDIT-TODO-NAME';
  id: string;
  title: string;
};
export type ActionChangeTodoFilter = {
  type: 'CHANGE-TODO-FILTER';
  id: string;
  filter: FilterType;
};

type Actions = ActionRemoveTodo | ActionAddTodo | ActionEditTodoName | ActionChangeTodoFilter;

export const todolistsReducer = (state: TodolistType[], action: Actions): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODO':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD-TODO':
      return [{ id: v1(), title: action.title, filter: 'all' }, ...state];
    case 'EDIT-TODO-NAME':
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl));
    case 'CHANGE-TODO-FILTER':
      return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter as FilterType } : tl));
    default:
      throw new Error('I don`t understand this type');
  }
};

// begin ACTION CREATORS
export const RemoveTodoAC = (todolistId: string): ActionRemoveTodo => ({
  type: 'REMOVE-TODO',
  id: todolistId,
});
export const AddTodoAC = (title: string): ActionAddTodo => ({ type: 'ADD-TODO', title });
export const EditTodoNameAC = (id: string, title: string): ActionEditTodoName => ({
  type: 'EDIT-TODO-NAME',
  id,
  title,
});
export const ChangeTodoFilterAC = (id: string, filter: FilterType): ActionChangeTodoFilter => ({
  type: 'CHANGE-TODO-FILTER',
  id,
  filter,
});
