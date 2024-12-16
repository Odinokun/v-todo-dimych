import { v1 } from 'uuid';
import { TodolistType } from '../App';

type ActionType = {
  type: string;
  [key: string]: string;
};

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      return [{ id: v1(), title: action.title, filter: 'all' }, ...state];
    case 'EDIT-TODOLIST-NAME':
      return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl));
    default:
      throw new Error('I don`t understand this type');
  }
};
