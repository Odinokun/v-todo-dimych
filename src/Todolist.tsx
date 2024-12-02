import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import { FilterType } from './App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeFilter: (filterVal: FilterType, todolistId: string) => void;
  changeTaskStatus: (id: string, todolistId: string, isDone: boolean) => void;
  filter: FilterType;
  deleteTodolist: (todolistId: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  removeTask,
  addTask,
  changeFilter,
  changeTaskStatus,
  filter,
  deleteTodolist,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const deleteTodolistHandler = () => deleteTodolist(todolistId);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter' && newTaskTitle) {
      addTaskHandler();
    } else if (e.key === 'Enter' && !newTaskTitle) {
      setError('Title is required');
    }
  };
  const addTaskHandler = () => {
    if (!newTaskTitle.trim()) {
      setError('Title is required');
      setNewTaskTitle('');
      return;
    }
    addTask(newTaskTitle.trim(), todolistId);
    setNewTaskTitle('');
  };
  const onAllClickHandler = () => changeFilter('all', todolistId);
  const onActiveClickHandler = () => changeFilter('active', todolistId);
  const onCompletedClickHandler = () => changeFilter('completed', todolistId);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '10px' }}>{title}</h3>
        <button onClick={deleteTodolistHandler}>del todolist</button>
      </div>

      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
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
          const onRemoveHandler = () => removeTask(t.id, todolistId);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatus(t.id, todolistId, e.currentTarget.checked);

          return (
            <li key={t.id}>
              <button onClick={onRemoveHandler}>del</button>
              <label className={t.isDone ? 'completed' : ''}>
                <input type='checkbox' checked={t.isDone} onChange={onChangeHandler} /> <span>{t.title}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
