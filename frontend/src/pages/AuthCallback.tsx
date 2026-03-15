import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleAuthCallback } from '../contexts/AuthContext';

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleAuthCallback(token);
    }
    navigate('/', { replace: true });
  }, [token, navigate]);

  return <div style={{ padding: '2rem', textAlign: 'center' }}>Signing you in…</div>;
}
