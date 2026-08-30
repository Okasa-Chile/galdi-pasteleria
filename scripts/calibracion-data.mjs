// Datos de comuna usados SOLO por las herramientas históricas de calibración /
// validación de delivery (calibrar-delivery.mjs, generar-tabla-validacion.mjs).
//
// NO son parte del modelo de producción. El modelo final (RADIO EN LÍNEA RECTA)
// vive en lib/deliveryPricing.ts y NO depende de comunas ni de precios por
// comuna. Estas constantes vivían antes en lib/ como parte del modelo
// comuna-primero (08-2026); se movieron aquí el 30-08-2026 al adoptar el modelo
// por radio, para dejar lib/ limpio.
//
// Se conservan porque las herramientas de validación por mapa las siguen
// consumiendo si hace falta re-auditar. Si se retiran esas herramientas, este
// archivo se puede borrar.

// Precios por comuna que definieron las socias (modelo comuna-primero).
// El modelo por radio ya no los aplica; se usan solo para MARCAR conflictos
// "banda vs. lo que las socias habían dicho" en la tabla de validación.
export const PRECIOS_COMUNA = {
  'maipu': 3000,
  'cerrillos': 3000,
  'pudahuel': 3000,
  'estacion central': 3000,
  'lo prado': 3000,
  'padre hurtado': 5000,
  'santiago': 6000,
  'san miguel': 6000,
  'providencia': 7000,
  'las condes': 10000,
  'lo barnechea': 12000,
};

// UNA dirección real por comuna (arteria principal / casco urbano), usada para
// medir distancias de referencia. `kmReal` = driving medido el 29-08-2026.
export const DIRECCIONES_REFERENCIA_COMUNAS = {
  'maipu':            { direccion: 'Av. 5 de Abril 190, Maipú',                        kmReal: 7.12 },
  'cerrillos':        { direccion: 'Av. Pedro Aguirre Cerda 6000, Cerrillos',          kmReal: 11.08 },
  'pudahuel':         { direccion: 'Av. San Pablo 8300, Pudahuel',                     kmReal: 9.96 },
  'estacion central': { direccion: 'Av. Las Rejas Norte 20, Estación Central',         kmReal: 12.08 },
  'lo prado':         { direccion: 'Río Snake, Lo Prado',                              kmReal: 9.25 },
  'padre hurtado':    { direccion: 'Camino San Alberto Hurtado 2900, Padre Hurtado',   kmReal: 28.94 },
  'santiago':         { direccion: 'República 40, Santiago',                           kmReal: 15.14 },
  'san miguel':       { direccion: 'Gran Avenida José Miguel Carrera 3600, San Miguel', kmReal: 18.90 },
  'providencia':      { direccion: 'Av. Providencia 2124, Providencia',                kmReal: 26.01 },
  'las condes':       { direccion: 'Av. Apoquindo 4501, Las Condes',                   kmReal: 30.95 },
  'lo barnechea':     { direccion: 'Av. La Dehesa 1445, Lo Barnechea',                 kmReal: 39.39 },
};
