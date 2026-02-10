import '../styles/Form.css'

const API_URL = import.meta.env.VITE_API_URL

export default function Form({
    onCreate,
    onUpdate,
    userId,
    task
}) {

    const createTask = async (e) => {
        e.preventDefault()

        const title = e.target.title.value
        const description = e.target.description.value

        if (task) {
            onUpdate({
                ...task,
                title,
                description
            })
            return
        }

        await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                createdBy: userId,
                description,
                status: "PENDING"
            })
        })

        onCreate()
    }

    return (
        <div className="box-container">
            <h3 className="header-title">{task ? 'Update' : 'Create'}</h3>

            <form className="form" onSubmit={createTask}>
                <input
                    className="form-input"
                    defaultValue={task?.title}
                    required
                    placeholder="Title"
                    name="title"
                />

                <input
                    className="form-input"
                    defaultValue={task?.description}
                    placeholder="Description"
                    name="description"
                />

                <button className="form-button">
                    {task ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    )
}
