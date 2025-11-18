'use client'

import { useEffect, useState } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // TODO: Initialize Amplify client and fetch todos
    // This requires running: npx amplify generate outputs
    // Then import from aws_exports
    console.log('TodoList component mounted - awaiting Amplify configuration')
  }, [])

  const handleAddTodo = async () => {
    if (!inputValue.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // TODO: Implement Amplify Data client mutation to create todo
      // Example (after amplify setup):
      // const { data } = await client.models.Todo.create({
      //   content: inputValue,
      // })
      // setTodos([...todos, data])
      // setInputValue('')

      console.log('Add todo functionality requires Amplify configuration')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      // TODO: Implement Amplify Data client mutation to delete todo
      // Example (after amplify setup):
      // await client.models.Todo.delete({ id })
      // setTodos(todos.filter(todo => todo.id !== id))

      console.log('Delete functionality requires Amplify configuration')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  return (
    <div style={styles.container}>
      <h1>My Todos</h1>

      <div style={styles.inputSection}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Add a new todo..."
          style={styles.input}
          disabled={isLoading}
        />
        <button
          onClick={handleAddTodo}
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.info}>
        <p>
          <strong>⚙️ Configuration Required:</strong>
        </p>
        <ol style={styles.list}>
          <li>Run: <code>npx amplify sandbox</code> to start local backend</li>
          <li>Run: <code>npx amplify generate outputs</code> to generate client</li>
          <li>Uncomment the TODO sections in this component</li>
          <li>Import the Amplify client and use it to fetch/mutate todos</li>
        </ol>
      </div>

      <div style={styles.todoList}>
        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>No todos yet. Add one to get started!</p>
        ) : (
          <ul>
            {todos.map((todo: any) => (
              <li key={todo.id} style={styles.todoItem}>
                <span>{todo.content}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={styles.deleteButton}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
  },
  inputSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#d32f2f',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
  },
  info: {
    backgroundColor: '#e3f2fd',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  list: {
    marginTop: '10px',
    paddingLeft: '20px',
  },
  todoList: {
    marginTop: '20px',
  },
  emptyMessage: {
    color: '#999',
    fontStyle: 'italic',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#d32f2f',
    cursor: 'pointer',
    fontSize: '18px',
  },
}
