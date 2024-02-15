import { useState } from "react";

function TaskInput({ onAdd }) {
    const [inputValue, setInputValue] = useState('');
  
    const handleAdd = () => {
      onAdd(inputValue);
      setInputValue('');
    };
    
    return (
      <>
        <p>새로운 Todo-list 작성하기✍</p>
        <div className="task_input">
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="내가 할 일은..." maxLength={60}/>
          <button onClick={handleAdd}>추가</button>
        </div>
      </>
    );
  }
  
  export default TaskInput;