import { useState, useEffect } from 'react';
import mentatLogo from '/mentat.png';

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackendMessage = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api');

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackendMessage();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        padding: '20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Logo */}
      <div>
        <a href="https://mentat.ai" target="_blank">
          <img src={mentatLogo} alt="Mentat Logo" />
        </a>
      </div>

      {/* Main content */}
      <div
        className="paper"
        style={{
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <h1>Mentat Template JS</h1>

        {/* Tech stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {[
            ['Frontend', 'React, Vite, Vitest'],
            ['Backend', 'Node.js, Express, Jest'],
            ['Utilities', 'TypeScript, ESLint, Prettier'],
          ].map(([title, techs]) => (
            <div className="section" style={{ textAlign: 'center' }} key={title}>
              <div
                style={{
                  fontWeight: '500',
                  fontSize: '14px',
                  color: '#1f2937',
                  marginBottom: '4px',
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{techs}</div>
            </div>
          ))}
        </div>

        {/* Server message */}
        <div className="section">
          <div
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1f2937',
              marginBottom: '8px',
            }}
          >
            Message from server:
          </div>
          <div style={{ fontSize: '14px', color: '#1f2937' }}>
            {loading ? (
              'Loading message from server...'
            ) : error ? (
              <span style={{ color: '#dc2626' }}>Error: {error}</span>
            ) : message ? (
              message
            ) : (
              <span style={{ color: '#6b7280', fontStyle: 'italic' }}>
                No message from server
              </span>
            )}
          </div>
        </div>

        {/* Call to action */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          Create a new GitHub issue and tag{' '}
          <code
            style={{
              backgroundColor: '#f8fafc',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#1f2937',
            }}
          >
            @MentatBot
          </code>{' '}
          to get started.
        </div>
      </div>
    </div>
  );
}

export default App;
