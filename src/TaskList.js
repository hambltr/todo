import TaskItem from './TaskItem';
import { useState, useEffect } from 'react';

function TaskList({ tasks, onDelete, searchTerm }) {
  const [searchTermValue, setSearchTermValue] = useState(searchTerm);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTermValue(searchTerm);
      setShowNoResultsMessage(searchTerm.trim() !== '' && tasks.every(task => !task.task.includes(searchTerm)));
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, tasks]);

  const filteredTasks = tasks.filter(task => task.task.includes(searchTermValue));

  return (
    <>
      {showNoResultsMessage && (
        <p>검색 결과가 없습니다.</p>
      )}
      {filteredTasks.length === 0 ? null : (
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;
