import React from 'react'
import axios from 'axios'

import Sidebar from './components/Sidebar'
import Content from './components/Content'

function App() {
  const [tasks, setTasks] = React.useState([])
  const [currentTask, setCurrentTask] = React.useState(null)
  const [activeTask, setActiveTask] = React.useState(null)

  React.useEffect(() => {
    axios.get('/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setTasks(data)
    })
  }, [currentTask])

  return (
    <div className="App">
      <div className="app-wrapper">
        <aside className="sidebar">
          <Sidebar
            tasks={tasks}
            setTasks={setTasks}
            setCurrentTask={setCurrentTask}
            activeTask={activeTask}
            setActiveTask={setActiveTask}
          />
        </aside>
        <div className="content">
          {activeTask == null ? (
            tasks.map((task) => (
              <Content
                key={task.id}
                currentTask={task}
                setCurrentTask={setCurrentTask}
                allTasks
              />
            ))
          ) : (
            <Content
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
            />
          )}
          {/* <Content currentTask={currentTask} setCurrentTask={setCurrentTask} /> */}
        </div>
      </div>
    </div>
  )
}

export default App
