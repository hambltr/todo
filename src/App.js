import './App.css';
import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

function App() {
  //사용자의 localStorage에 tasks로 저장된 값이 있는지 확인하고
  const storedTasks = localStorage.getItem('tasks');
  //tasks가 있으면 불러오고, 없으면 [] 빈 배열로 만들어주기
  const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];

  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('light');
  const [emoji, setEmoji] = useState('🌙');

  //다크모드 로직 (.App + class명으로 제어)
  useEffect(() => {
    document.body.className = mode === 'light' ? 'App light' : 'App dark';
  }, [mode]);

  // tasks state가 변경될 때(데이터 추가), localStorage에 tasks 데이터 저장
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // task에 추가될 데이터의 형식 지정
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

  // 삭제 로직
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 검색 로직
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 다크모드 버튼의 이모지 변경 로직
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
