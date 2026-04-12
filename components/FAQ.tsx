'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '¿Cómo hago un pedido?',
    a: 'La forma más rápida es escribirnos por WhatsApp al +56 9 9099 1011. Cuéntanos qué necesitas, la fecha de entrega y la dirección, y te respondemos con disponibilidad y precio el mismo día. También puedes escribirnos a ventas@galdi.cl si prefieres el correo.',
  },
  {
    q: '¿Hacen delivery? ¿A qué sectores despachan?',
    a: 'Sí, hacemos delivery dentro de Maipú y comunas cercanas. El pedido llega directamente a tu domicilio o lugar de evento en el horario que acordemos. Los costos y la cobertura exacta los confirmamos por WhatsApp según tu dirección — escríbenos y te informamos al tiro.',
  },
  {
    q: '¿Con cuánta anticipación debo hacer mi pedido?',
    a: 'Depende del producto. Las tortas personalizadas requieren mínimo 5 días de anticipación para asegurar la preparación y decoración. Para el resto de productos — pan, empanadas, galletas, kuchen, desayunos — con 48 horas es suficiente. Si tienes una fecha fija para tu evento, avísanos lo antes posible: mientras más tiempo tengamos, mejor podemos coordinar.',
  },
  {
    q: '¿Pueden adaptarse a restricciones alimentarias?',
    a: 'Sí, trabajamos con restricciones específicas según el pedido. Consúltanos directamente por WhatsApp: te indicamos qué productos son aptos para distintas necesidades y evaluamos si podemos preparar versiones adaptadas. Siempre es mejor avisarnos antes para coordinar los ingredientes y evitar contaminación cruzada.',
  },
  {
    q: '¿Tienen precios especiales para eventos?',
    a: 'Para eventos con 20 o más personas preparamos una cotización personalizada según el tipo de preparación, la cantidad y la modalidad de entrega (retiro en Maipú o despacho al lugar del evento). Escríbenos con la fecha, el número de invitados y el tipo de servicio que necesitas — coffee break, mesa dulce, cóctel, matrimonio — y te enviamos la propuesta en el día.',
  },
  {
    q: '¿Hacen tortas para celíacos o diabéticos?',
    a: 'Consultamos caso a caso. Para celíacos, evaluamos la preparación según el tipo de torta solicitada, ya que nuestra cocina no es libre de gluten por defecto y existe riesgo de contaminación cruzada — algo que siempre informamos con honestidad. Para personas diabéticas o con restricción de azúcar, podemos preparar versiones con endulzante alternativo en varias de nuestras tortas. Lo importante es que nos cuentes la necesidad con anticipación para ver qué opciones son viables sin comprometer el resultado.',
  },
  {
    q: '¿Puedo ir a buscar el pedido o solo hacen despacho?',
    a: 'Sí, puedes retirar tu pedido directamente en nuestra cocina en Maipú. Es la opción que muchos clientes prefieren porque así reciben el producto recién terminado, sin tiempo en tránsito. Coordinas el día y la hora de retiro al momento de hacer el pedido por WhatsApp y nosotras lo tenemos listo para ti. Si prefieres que lleguemos a ti, también hacemos despacho a domicilio dentro de Maipú y comunas cercanas.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="preguntas-frecuentes"
      style={{
        background: '#F9F3EC',
        padding: '5rem 5%',
      }}
    >
      <style>{`
        .faq-item {
          border: 1px solid #e4d8c8;
          border-radius: 3px;
          margin-bottom: 0.75rem;
          overflow: hidden;
        }
        .faq-question {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          text-align: left;
          font-family: 'Jost', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #2a1a0e;
          gap: 1rem;
          transition: background 0.2s;
        }
        .faq-question:hover {
          background: rgba(201,165,90,0.06);
        }
        .faq-icon {
          color: #C9A55A;
          font-size: 1.4rem;
          font-weight: 300;
          line-height: 1;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .faq-icon.open {
          transform: rotate(45deg);
        }
        .faq-answer {
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          line-height: 1.75;
          color: #4a3728;
          padding: 0 1.5rem 1.3rem;
        }
      `}</style>

      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: '#2a1a0e',
            textAlign: 'center',
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}
        >
          Preguntas frecuentes
        </h2>
        <p
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.95rem',
            color: '#7a6050',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '0.04em',
          }}
        >
          Todo lo que necesitas saber antes de hacer tu pedido
        </p>

        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.q}</span>
              <span className={`faq-icon${openIndex === index ? ' open' : ''}`}>+</span>
            </button>
            {openIndex === index && (
              <p className="faq-answer">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
