export default function BannerDiaMadre() {
  return (
    <div style={{
      background: 'transparent',
      paddingTop: '90px',
      paddingBottom: '9px',
      paddingLeft: '16px',
      paddingRight: '16px',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      color: '#f5e6d3',
      letterSpacing: '0.03em',
      fontWeight: 400,
    }}>
      <a
        href="/dia-de-la-madre"
        style={{ color: '#f5e6d3', textDecoration: 'none', cursor: 'pointer', display: 'block' }}
      >
        🌸 <strong style={{ fontWeight: 500 }}>Día de la Madre</strong> — Tortas artesanales con delivery en Maipú · Encarga la tuya →
      </a>
    </div>
  );
}
