import './App.css';
import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

function App() {
  // 이전에 저장된 tasks 데이터 확인
  const storedTasks = localStorage.getItem('tasks');
  const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];

  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('light');
  const [emoji, setEmoji] = useState('🌙');

  useEffect(() => {
    document.body.className = mode === 'light' ? 'App light' : 'App dark';
  }, [mode]);

  // localStorage에 tasks 데이터 저장
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskContent) => {
    if (taskContent.trim() !== '') {
      const newTask = {
        id: new Date().getTime(),
        task: taskContent,
        completed: false,
        date: new Date().toLocaleDateString('ko-KR'),
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const changeEmoji = () => {
    setEmoji(emoji === '🌙' ? '☀️' : '🌙');
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="App">
      <div className="mode_box">
        <div></div>
        <p>오늘은 📅</p>
        <button className="emoji_btn" onClick={changeEmoji}>{emoji}</button>
      </div>
      <p className="pdate">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <div className="write_wrap">
        <TaskInput onAdd={handleAddTask} />
        <input className="search" type="text" placeholder="검색..." value={searchTerm} onChange={handleSearchChange} />
        <div className="row-line"></div>
        <TaskList tasks={tasks} onDelete={handleDeleteTask} searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;
