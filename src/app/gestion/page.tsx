'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

const USUARIOS_AUTORIZADOS = [
  'contacto@okasa.cl',
  'ventas@galdi.cl',
];

export default function GestionPage() {
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return () => unsub();
  }, []);

  const login = async () => {
    try {
      setError('');
      const result = await signInWithPopup(auth, googleProvider);
      if (!USUARIOS_AUTORIZADOS.includes(result.user.email || '')) {
        await signOut(auth);
        setError('Acceso no autorizado. Usa una cuenta habilitada.');
      }
    } catch (e: any) {
      setError('Error al iniciar sesión: ' + e.message);
    }
  };

  if (cargando) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}}>
      Cargando...
    </div>
  );

  if (!usuario) return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif',background:'#F9F3EC'}}>
      <h1 style={{fontFamily:'Georgia,serif',fontWeight:300,fontSize:'2rem',color:'#1a0f0a',marginBottom:'8px'}}>galdi</h1>
      <p style={{color:'#9c7a5a',fontSize:'0.85rem',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'32px'}}>Gestión interna</p>
      {error && <p style={{color:'#9b3a2a',marginBottom:'16px',fontSize:'0.9rem'}}>{error}</p>}
      <button onClick={login} style={{background:'#C9A55A',color:'#fff',border:'none',padding:'12px 28px',borderRadius:'6px',fontSize:'0.85rem',letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',fontWeight:600}}>
        Iniciar sesión con Google
      </button>
    </div>
  );

  return (
    <div style={{fontFamily:'sans-serif',minHeight:'100vh',background:'#F9F3EC'}}>
      <div style={{background:'#1a0f0a',padding:'12px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'2px solid #C9A55A'}}>
        <span style={{color:'#fff',fontFamily:'Georgia,serif',fontSize:'1.3rem',fontWeight:300}}>galdi · gestión</span>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{color:'#9c7a5a',fontSize:'0.8rem'}}>{usuario.email}</span>
          <button onClick={() => signOut(auth)} style={{background:'transparent',border:'1px solid #C9A55A',color:'#C9A55A',padding:'5px 14px',borderRadius:'4px',fontSize:'0.75rem',cursor:'pointer'}}>
            Salir
          </button>
        </div>
      </div>
      <div style={{padding:'32px',maxWidth:'960px',margin:'0 auto'}}>
        <p style={{color:'#9c7a5a',fontSize:'0.9rem'}}>✓ Sesión iniciada correctamente. El sistema de gestión completo se cargará aquí.</p>
      </div>
    </div>
  );
}
