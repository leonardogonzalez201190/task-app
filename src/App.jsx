import { useEffect, useState } from 'react'
import Form from './components/Form'
import TaskList from './components/TaskList'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [userId, setUserId] = useState('')
  const [edit, setEdit] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/users`)
    const data = await res.json()
    setUsers(data)
  }

  const fetchTasks = async (_userId) => {
    if (!_userId) return
    const res = await fetch(`${API_URL}/tasks/search?userId=${_userId}`)
    const data = await res.json()
    setTasks(data)
  }

  const onUserSelect = (userId) => {
    setUserId(userId)
    setTasks([])
    fetchTasks(userId)
  }

  const onDeleteTask = async (taskId) => {
    await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    })
    fetchTasks(userId)
  }

  const onUpdateTask = async (task) => {
    await fetch(`${API_URL}/tasks/${task.taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: task.status,
        assignedTo: task.assignedTo
      })
    })
    fetchTasks(userId)
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Task App</h1>

      <select
        className="user-select"
        value={userId}
        onChange={e => onUserSelect(e.target.value)}
      >
        <option value="">Select user</option>
        {users.map(u => (
          <option key={u.userId} value={u.userId}>
            {u.name}
          </option>
        ))}
      </select>

      <div className="app-content">
        {userId && (
          <TaskList
            tasks={tasks}
            users={users}
            userId={userId}
            onStatusChange={onUpdateTask}
            onUserAssign={onUpdateTask}
            onEdit={setEdit}
            onDelete={(taskId) => onDeleteTask(taskId)}
          />
        )}

        {userId && (
          <Form
            task={edit}
            onUpdate={onUpdateTask}
            onCreate={() => fetchTasks(userId)}
            userId={userId}
          />
        )}
      </div>
    </div>
  )
}

export default App
