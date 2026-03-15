import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { EventPage } from './pages/EventPage';
import { Leaderboard } from './pages/Leaderboard';
import { AuthCallback } from './pages/AuthCallback';
import { Login } from './pages/Login';
import { DevLogin } from './pages/DevLogin';
import { ProposeEvent } from './pages/ProposeEvent';
import { MyProposed } from './pages/MyProposed';
import styles from './App.module.css';

const isLocalDev = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || import.meta.env.VITE_DEV_LOGIN === 'true');

function Header() {
  const { user, loading, logout } = useAuth();
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>TrueStory</Link>
      <nav>
        <Link to="/">Events</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {user && (
          <>
            <Link to="/propose">Propose event</Link>
            <Link to="/my-events">My events</Link>
          </>
        )}
        {loading ? (
          <span className={styles.navMuted}>…</span>
        ) : user ? (
          <>
            <span className={styles.userName}>{user.displayName || user.email || 'User'}</span>
            <button type="button" onClick={logout} className={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.loginLink}>Log in</Link>
            {isLocalDev && (
              <Link to="/dev-login" className={styles.devLoginLink}>Dev login</Link>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dev-login" element={<DevLogin />} />
            <Route path="/propose" element={<ProposeEvent />} />
            <Route path="/my-events" element={<MyProposed />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
