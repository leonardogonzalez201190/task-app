import { useEffect, useState } from 'react'
import Form from './components/Form'
import TaskList from './components/TaskList'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [userId, setUserId] = useState('');
  const [edit, setEdit] = useState(null);

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
    <div style={{
      padding: 20,
      fontFamily: 'Arial',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1>Task App</h1>

      <select
        value={userId}
        onChange={e => onUserSelect(e.target.value)}
        style={{ padding: 8, marginRight: 10 }}
      >
        <option value="">Selecciona usuario</option>
        {users.map(u => (
          <option key={u.userId} value={u.userId}>
            {u.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        {userId && (
          <Form
            task={edit}
            onUpdate={onUpdateTask}
            onCreate={() => fetchTasks(userId)}
            userId={userId} />
        )}

        {userId && (
          <TaskList
            tasks={tasks}
            users={users}
            onStatusChange={onUpdateTask}
            onUserAssign={onUpdateTask}
            onEdit={setEdit}
            onDelete={(task) => onDeleteTask(task)} />
        )}
      </div>
    </div>
  )
}


export default App
