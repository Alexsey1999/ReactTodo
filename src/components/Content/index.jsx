import React from 'react'
import axios from 'axios'

import Button from '../Button'
import AddTaskPanel from '../AddTaskPanel'
import ListItem from '../ListItem'

import './Content.scss'

const Content = ({ currentTask, setCurrentTask, allTasks }) => {
  const [isAddPanel, setIsAddPanel] = React.useState(false)

  const addTask = () => {
    setIsAddPanel(true)
  }

  const editCategoryName = () => {
    const newName = prompt(currentTask.name)
    if (!newName) {
      return
    }
    axios
      .patch(`http://localhost:3001/lists/${currentTask.id}`, {
        name: newName,
      })
      .then(() => {
        setCurrentTask({ ...currentTask, name: newName })
      })
  }

  return (
    <div className="content-wrapper">
      <div className="category-title-wrapper">
        <h2
          className="category-title"
          style={{ color: currentTask && currentTask.color.hex }}
        >
          {currentTask && currentTask.name}
          <svg
            onClick={editCategoryName}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9337 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.638 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825V3.36825Z"
              fill="black"
            />
          </svg>
        </h2>
      </div>
      {currentTask && !allTasks && !currentTask.tasks.length ? (
        <h2 className="no-todos-title">Задачи отсутствуют</h2>
      ) : (
        <ul className="todo-list">
          {currentTask &&
            currentTask.tasks.map((task) => (
              <ListItem
                key={task.id}
                {...task}
                setCurrentTask={setCurrentTask}
                currentTask={currentTask}
              />
            ))}
        </ul>
      )}

      {isAddPanel ? (
        <AddTaskPanel
          setIsAddPanel={setIsAddPanel}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      ) : (
        <Button className="add-task-btn" onClick={addTask}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1V15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 8H15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Новая задача</span>
        </Button>
      )}
    </div>
  )
}

export default Content
