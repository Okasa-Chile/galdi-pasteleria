export default function BannerDiaMadre() {
  return (
    <div style={{
      background: '#c4704f',
      marginTop: '90px',
      padding: '9px 16px',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      color: '#f5e6d3',
      letterSpacing: '0.04em',
    }}>
      <a
        href="/"
        style={{ color: '#f5e6d3', textDecoration: 'none', cursor: 'pointer', display: 'block' }}
      >
        🎂 <strong style={{ fontWeight: 500 }}>Día del Padre</strong> — ¡Se viene el 22 de junio! Encarga tu torta artesanal con anticipación →
      </a>
    </div>
  );
}
