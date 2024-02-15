import { useState, useEffect } from 'react';

function TaskItem({ task, onDelete }) {
  const [isChecked, setIsChecked] = useState(task.completed);
  const [shakeEffect, setShakeEffect] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDelete = () => {
    setIsDeleting(true); // 삭제 애니메이션 시작
    setTimeout(() => onDelete(task.id), 500); // 애니메이션 지속 시간 후 삭제 실행
  };

  useEffect(() => {
    if (!isChecked) {
      setShakeEffect(true);
      setTimeout(() => setShakeEffect(false), 500); // 추가하면서 지진 효과 지속 시간
    }
  }, [isChecked]);

  return (
    <li className={`${shakeEffect ? 'shake' : ''} ${isDeleting ? 'deleting' : ''}`}>
      {isDeleting ? (
        <>
          <div className="split-left">{task.task.slice(0, Math.floor(task.task.length / 2))}</div>
          <div className="split-right">{task.task.slice(Math.floor(task.task.length / 2))}</div>
        </>
      ) : (
      <>
        <div className='li_wrap'> 
          <div className='li_left'>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/> 
            <div>
              {task.task}
            </div>
          </div>
          <div className='li_right'>
            <div>
              {task.date}
            </div> 
            <button 
              onClick={handleDelete} disabled={!isChecked} 
              title={!isChecked ? '먼저 체크박스를 체크해야 삭제할 수 있습니다.' : ''}
              style={{ cursor: !isChecked ? 'not-allowed' : 'pointer' }}>
              삭제
            </button>

          </div>
        </div>
      </>
      )}
    </li>
  );
}

export default TaskItem;
