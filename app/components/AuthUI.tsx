'use client'

import { useEffect, useState } from 'react'

export default function AuthUI() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Initialize Amplify Auth and check current user
    // Example (after amplify setup):
    // import { getCurrentUser } from 'aws-amplify/auth'
    //
    // const checkUser = async () => {
    //   try {
    //     const currentUser = await getCurrentUser()
    //     setUser(currentUser)
    //   } catch (err) {
    //     setUser(null)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // checkUser()

    setIsLoading(false)
  }, [])

  const handleSignOut = async () => {
    try {
      // TODO: Implement sign out
      // import { signOut } from 'aws-amplify/auth'
      // await signOut()
      // setUser(null)

      console.log('Sign out functionality requires Amplify configuration')
    } catch (err) {
      console.error('Sign out failed:', err)
    }
  }

  if (isLoading) {
    return <div style={styles.container}>Loading...</div>
  }

  if (user) {
    return (
      <div style={styles.container}>
        <div style={styles.userCard}>
          <p>Welcome, <strong>{user.username}</strong>!</p>
          <button onClick={handleSignOut} style={styles.button}>
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.authCard}>
        <h2>Sign In / Sign Up</h2>
        <p style={styles.instruction}>
          <strong>⚙️ Configuration Required:</strong>
        </p>
        <ol style={styles.list}>
          <li>Run: <code>npx amplify sandbox</code> to start local backend</li>
          <li>Run: <code>npx amplify generate outputs</code> to generate client</li>
          <li>Import the Amplify auth functions in this component</li>
          <li>Use the <code>Authenticator</code> component from @aws-amplify/ui-react</li>
        </ol>
        <p style={styles.hint}>
          For now, authentication is configured in <code>amplify/auth/resource.ts</code> but requires the client setup above.
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center' as const,
  },
  userCard: {
    backgroundColor: '#e8f5e9',
    padding: '20px',
    borderRadius: '8px',
    display: 'inline-block',
    minWidth: '300px',
  },
  authCard: {
    backgroundColor: '#fff3e0',
    padding: '20px',
    borderRadius: '8px',
    display: 'inline-block',
    minWidth: '400px',
    textAlign: 'left' as const,
  },
  instruction: {
    marginTop: '15px',
    marginBottom: '10px',
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '15px',
  },
  hint: {
    fontSize: '14px',
    color: '#666',
    marginTop: '15px',
    fontStyle: 'italic',
  },
  button: {
    marginTop: '15px',
    padding: '10px 20px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}
