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
        <div>
            <h3>Crear tarea</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={createTask}>
                <input
                    defaultValue={task?.title}
                    required
                    placeholder="Título"
                    name="title"
                    style={{
                        padding: 8,
                    }}
                />
                <input
                    defaultValue={task?.description}
                    placeholder="Descripción"
                    name="description"
                    style={{
                        padding: 8,
                    }}
                />

                <button
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer'
                    }}
                >
                    {task ? 'Actualizar' : 'Crear'}
                </button>
            </form>
        </div>
    )
}