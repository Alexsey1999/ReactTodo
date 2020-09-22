import React from 'react'
import axios from 'axios'

import './AddTaskPanel.scss'

const AddTaskPanel = ({ setIsAddPanel, currentTask, setCurrentTask }) => {
  const [taskText, setTaskText] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const addTodo = (currentTask) => {
    if (!taskText) {
      return
    }
    setIsLoading(true)
    axios
      .post('http://localhost:3001/tasks', {
        text: taskText,
        listId: currentTask.id,
        completed: false,
      })
      .then(({ data }) => {
        setCurrentTask({ ...currentTask, tasks: [...currentTask.tasks, data] })
      })
      .catch(() => {
        console.log('Не удалось добавить задачу')
      })
      .finally(() => {
        setIsLoading(false)
        setIsAddPanel(false)
      })
  }

  return (
    <div className="add-task-panel">
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="default-input"
        type="text"
        placeholder="Текст задачи"
      />
      <div className="add-task-btns">
        <button
          className="default-btn add-btn"
          onClick={() => addTodo(currentTask)}
        >
          {isLoading ? 'Добавление задачи...' : 'Добавить задачу'}
        </button>
        <button className="cancel-btn" onClick={() => setIsAddPanel(false)}>
          Отмена
        </button>
      </div>
    </div>
  )
}

export default AddTaskPanel
