import { v1 } from 'uuid';
import { AllTasksType } from '../App';
import { TaskType } from '../Todolist';
import { AddTodolistACType, RemoveTodolistACType, todolistsId1, todolistsId2 } from './todolists-reducer';

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type EditTaskACType = ReturnType<typeof editTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type ChangeStatusACType = ReturnType<typeof changeStatusAC>;

type ActionsType =
  | AddTaskACType
  | EditTaskACType
  | RemoveTaskACType
  | ChangeStatusACType
  | AddTodolistACType
  | RemoveTodolistACType;

const initialState: AllTasksType = {
  [todolistsId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
    { id: v1(), title: 'Storybook', isDone: false },
  ],
  [todolistsId2]: [
    { id: v1(), title: 'Friends', isDone: true },
    { id: v1(), title: 'Game of Thrones', isDone: true },
    { id: v1(), title: 'Peaky Blinders', isDone: false },
    { id: v1(), title: 'Breaking Bad', isDone: false },
    { id: v1(), title: 'The Witcher', isDone: false },
  ],
};

export const tasksReducer = (state: AllTasksType = initialState, action: ActionsType): AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK': {
      const { todolistId, title } = action.payload;
      const newTask: TaskType = { id: v1(), title, isDone: false };
      return { ...state, [todolistId]: [newTask, ...state[todolistId]] };
    }
    case 'EDIT-TASK': {
      const { todolistId, id, title } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map(t => (t.id === id ? { ...t, title } : t)) };
    }
    case 'REMOVE-TASK': {
      const { todolistId, id } = action.payload;
      return { ...state, [todolistId]: state[todolistId].filter(t => t.id !== id) };
    }
    case 'CHANGE-STATUS': {
      const { todolistId, id, isDone } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map(t => (t.id == id ? { ...t, isDone } : t)) };
    }
    case 'ADD-TODOLIST': {
      const { todolistId } = action.payload;
      return { [todolistId]: [], ...state };
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.id];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: { todolistId, title },
  } as const;
};
export const editTaskAC = (todolistId: string, id: string, title: string) => {
  return {
    type: 'EDIT-TASK',
    payload: { todolistId, id, title },
  } as const;
};
export const removeTaskAC = (todolistId: string, id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: { todolistId, id },
  } as const;
};
export const changeStatusAC = (todolistId: string, id: string, isDone: boolean) => {
  return {
    type: 'CHANGE-STATUS',
    payload: { todolistId, id, isDone },
  } as const;
};
