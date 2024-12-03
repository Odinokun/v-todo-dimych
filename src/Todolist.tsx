import { ChangeEvent, FC } from 'react';
import { FilterType } from './App';
import { AddItemForm } from './components/AddItemForm';
import { EditableSpan } from './components/EditableSpan';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  editTodolistName: (todolistId: string, title: string) => void;
  title: string;
  tasks: TaskType[];
  removeTask: (todolistId: string, id: string) => void;
  addTask: (todolistId: string, title: string) => void;
  editTask: (todolistId: string, id: string, title: string) => void;
  changeFilter: (todolistId: string, filterVal: FilterType) => void;
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
  filter: FilterType;
  deleteTodolist: (todolistId: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  editTodolistName,
  title,
  tasks,
  removeTask,
  addTask,
  editTask,
  changeFilter,
  changeTaskStatus,
  filter,
  deleteTodolist,
}) => {
  const editTodolistNameHandler = (title: string) => editTodolistName(todolistId, title);
  const deleteTodolistHandler = () => deleteTodolist(todolistId);

  const onAllClickHandler = () => changeFilter(todolistId, 'all');
  const onActiveClickHandler = () => changeFilter(todolistId, 'active');
  const onCompletedClickHandler = () => changeFilter(todolistId, 'completed');

  const addTaskHandler = (newTaskTitle: string) => addTask(todolistId, newTaskTitle);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '10px' }}>
          <EditableSpan title={title} callback={editTodolistNameHandler} />
        </h3>
        <button onClick={deleteTodolistHandler}>del todolist</button>
      </div>

      <AddItemForm btnName='add task' callback={addTaskHandler} errorName='Hey dude!!! This field is required!' />
      <br />

      <div>
        <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>
          All
        </button>
        <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>
          Active
        </button>
        <button className={filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>
          Completed
        </button>
      </div>

      <ul>
        {tasks.map(t => {
          const onRemoveHandler = () => removeTask(todolistId, t.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
          const onChangeTitleHandler = (newTaskTitle: string) => editTask(todolistId, t.id, newTaskTitle);

          return (
            <li key={t.id} className={t.isDone ? 'completed' : ''}>
              <button onClick={onRemoveHandler}>del</button>
              <input type='checkbox' checked={t.isDone} onChange={onChangeStatusHandler} />
              <EditableSpan title={t.title} callback={onChangeTitleHandler} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
