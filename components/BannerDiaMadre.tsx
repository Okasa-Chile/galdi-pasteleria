export default function BannerDiaMadre() {
  return (
    <div style={{
      paddingTop: '8px',
      paddingBottom: '10px',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      letterSpacing: '0.04em',
      borderBottom: '1px solid rgba(212,168,83,0.3)',
    }}>
      <a
        href="/dia-de-la-madre"
        style={{ color: 'var(--gold, #d4a853)', textDecoration: 'none', cursor: 'pointer', display: 'block' }}
      >
        🌸 <strong style={{ fontWeight: 500 }}>Día de la Madre</strong> — Tortas artesanales con delivery en Maipú · Encarga la tuya →
      </a>
    </div>
  );
}
