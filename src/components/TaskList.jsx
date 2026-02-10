import { TASK_STATUS } from "../constants"
import "../styles/TaskList.css"

export default function TaskList({
    tasks,
    userId,
    users,
    onStatusChange,
    onUserAssign,
    onEdit,
    onDelete
}) {

    if (!tasks.length) {
        return (
            <div className="task-list-container">
                <h3 className="task-list-title">Task List</h3>
                <p>No tasks found for this user.</p>
            </div>
        )
    }

    return (
        <div className="box-container">
            <h3 className="header-title">Task List</h3>

            <table className="task-table">
                <thead>
                    <tr>
                        <th className="task-th">Title</th>
                        <th className="task-th">Description</th>
                        <th className="task-th">Status</th>
                        <th className="task-th">Assigned to</th>
                        <th className="task-th">Edit</th>
                        <th className="task-th">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map(task => {
                        const isDisabled = task.createdBy !== userId

                        return (
                            <tr key={task.taskId}>
                                <td className="task-td">{task.title}</td>

                                <td className="task-td">{task.description}</td>

                                <td className="task-td">
                                    <select
                                        className="task-select"
                                        value={task.status}
                                        onChange={(e) =>
                                            onStatusChange({
                                                ...task,
                                                status: e.target.value
                                            })
                                        }
                                    >
                                        {Object.keys(TASK_STATUS).map(status => (
                                            <option key={status} value={status}>
                                                {TASK_STATUS[status]}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="task-td">
                                    <select
                                        className="task-select"
                                        value={task.assignedTo}
                                        onChange={(e) =>
                                            onUserAssign({
                                                ...task,
                                                assignedTo: e.target.value
                                            })
                                        }
                                    >
                                        <option value="">Select user</option>
                                        {users.map(user => (
                                            <option
                                                key={user.userId}
                                                value={user.userId}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="task-td">
                                    <button
                                        disabled={isDisabled}
                                        onClick={() => onEdit(task)}
                                        className={`task-button task-button-edit ${
                                            isDisabled ? "task-button-disabled" : ""
                                        }`}
                                    >
                                        Edit
                                    </button>
                                </td>

                                <td className="task-td">
                                    <button
                                        disabled={isDisabled}
                                        onClick={() => onDelete(task.taskId)}
                                        className={`task-button task-button-delete ${
                                            isDisabled ? "task-button-disabled" : ""
                                        }`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
