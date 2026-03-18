# AI_CONTEXT — Proyecto Galdi Pastelería
> Registro de trabajo asistido por IA · Actualizado: marzo 2026

---

## 🗂️ Información del Proyecto

| Campo | Valor |
|---|---|
| **Proyecto** | Sitio web público de Galdi Pastelería |
| **Cliente / Dueño** | Jaqueline e Ingrid Gálvez Díaz (hermanas) |
| **Ubicación** | Maipú, Chile |
| **Tipo de negocio** | Pastelería artesanal y catering |
| **Desarrollador** | Claudio (GitHub: `Okasa-Chile`) |
| **Repositorio** | `Okasa-Chile/galdi-pasteleria` |
| **Firebase Project** | `studio-3718566942-edde2` |
| **Firebase Site** | `galdi-web` (multisite junto a `okasa-proyecto.web.app`) |
| **URL Preview DEV** | `https://studio-3718566942-edde2--preview-adv9uv9u.web.app` (expira 23 mar 2026) |
| **Stack** | HTML + CSS + JS puro, single file (`index.html`) |

---

## 🏗️ Estructura del Proyecto

```
galdi-web/
  ├── index.html              ← sitio completo (single file)
  ├── firebase.json           ← configuración Firebase Hosting multisite
  ├── .firebaseignore
  └── images/
      ├── logo-ancho.png      ← logo horizontal Galdi
      ├── frame.png           ← QR de contacto
      ├── hero-final-freepik.jpeg
      ├── hero-final-16-9.png
      ├── hero-socias-vintage.jpg
      ├── hero-premium-chefs.jpg
      ├── hero-b2b.jpg
      ├── prod-dulces.jpg
      ├── prod-empanada.jpg
      └── prod-pie.jpg
```

---

## ✅ Trabajo Completado

### Fase 1 — Fundamentos (sesión inicial)
- [x] Análisis del video de referencia (plugin `frontend-design` de Claude Code via Skill SKILL.md)
- [x] Definición de stack: HTML + CSS + JS puro, sin frameworks
- [x] Estrategia Firebase: multisite bajo proyecto existente (plan Spark gratuito)
- [x] Inicialización del repositorio Git y push a GitHub
- [x] Decisión de secciones del sitio:
  - Hero slideshow · Productos · Servicios · Sobre Nosotras · Contacto + WhatsApp · Footer

### Fase 2 — Diseño y contenido
- [x] Generación de `index.html` base con el skill `/frontend-design` en Claude Code
- [x] Procesamiento del logo: remoción de fondo rosa/salmón → PNG transparente (Python PIL + numpy)
- [x] Integración de imágenes: hero (4 slides), productos (3 fotos), servicios, logo, QR
- [x] Configuración del hero slideshow automático (intervalo 5s, overlay oscuro)
- [x] Botón flotante WhatsApp siempre visible (+56940211756)
- [x] Formulario de contacto que construye mensaje y abre WhatsApp

### Fase 3 — Catálogo de productos
- [x] Transcripción completa de recetas escritas a mano (6 categorías, 28+ productos)
- [x] Integración del catálogo en la sección galería con tarjetas visuales por categoría
- [x] Commit: `"feat: catálogo completo de productos Galdi — 6 categorías, 28 productos"`

### Fase 4 — Ajustes de diseño
- [x] Aclarado del sitio: alternancia secciones oscuras/claras (fondo crema cálido para Productos y Nosotras)
- [x] Reordenamiento de secciones: Productos ahora va **antes** de Servicios
- [x] Decisión de reemplazar fotos de las hermanas en hero por fotos de productos (pendiente ejecución)

### Fase 5 — Deploy
- [x] Instalación y configuración de Firebase CLI
- [x] `firebase init hosting` → proyecto `studio-3718566942-edde2`
- [x] Deploy a canal preview DEV: `firebase hosting:channel:deploy preview --expires 7d`
- [x] URL preview activa y verificada

---

## 📦 Catálogo Completo de Productos

### 🍞 Pan Artesanal
| Producto | Rendimiento |
|---|---|
| Pan Amasado | 16 u. de 100g |
| Tortilla / Pan con Chicharrones | 350g por tortilla |
| Pan Integral | — |
| Pan Frica (semillas sésamo opcional) | — |
| Dobloditas | 18 u. de 20cm |

### 🎂 Pasteles y Tartas
- Pie de Limón Merengado (molde 26–28cm)
- Tartaletas / Kuchen (misma masa base del pie)
- Banofee (manjar, plátano, crema, chocolate)
- Kuchen Sureño (frutas: frambuesa, manzana, arándano, frutilla, durazno)
- Kuchen de Nuez (con leche condensada)

### 🍰 Tortas
- 3 Leches · Chocolate · Moca/Pralinée · Panqueque · Selva Negra · Pavé

### 🍪 Dulces y Alfajores
| Producto | Rendimiento |
|---|---|
| Chilenitos | — |
| Alfajores de Maicena (manjar + coco) | 40 bocados |
| Alfajores de Chocolate (cobertura semi amargo y blanco) | 12 de cm7 |

### 🥐 Queques y Muffins
- Queque de Naranja · Queque Mármol · Queque de Yogurt · Muffins varios sabores

### 🥟 Empanadas (venta por docena)
- Pino · Napolitana · Vegetariana · Queso Camarón

---

## 🛠️ Decisiones Técnicas y Aprendizajes

### Firebase Multisite
- El plan Spark (gratuito) permite múltiples sitios bajo un mismo proyecto
- `firebase.json` usa targets por sitio para deploy selectivo
- Deploy: `firebase deploy --only hosting:galdi`
- Preview: `firebase hosting:channel:deploy preview --expires 7d`

### Remoción de fondo del logo
```python
# Enfoque PIL + numpy — threshold por rango de color
from PIL import Image
import numpy as np

img = Image.open("logo.png").convert("RGBA")
data = np.array(img)
# Detectar pixels rosa/salmón y setear alpha = 0
mask = (data[:,:,0] > 200) & (data[:,:,1] < 150) & (data[:,:,2] < 150)
data[mask, 3] = 0
Image.fromarray(data).save("logo-transparent.png")
```

### Flujo de trabajo IA
- Claude.ai (chat) → prepara prompts completos → Claudio los pega en Claude Code
- Para prompts largos: generar `.txt` descargable → abrir en VS Code → copiar → pegar en Claude Code
- Cambios múltiples siempre en un solo prompt a Claude Code (no en partes)
- Skill `/frontend-design` en Claude Code maneja el diseño premium

### Limitaciones conocidas
- GitHub: autenticación manual (Claude Chrome MCP no puede autenticarse)
- Visual del sitio: Claude no puede ver el resultado — Claudio debe compartir capturas
- Firebase: el proyecto real es `studio-3718566942-edde2`, no `okasa-proyecto`

---

## 🚨 PENDIENTE URGENTE

- [ ] **Migrar Galdi a su propio proyecto Firebase independiente.** Actualmente comparte proyecto con Okasa (`studio-3718566942-edde2`) lo que causó un incidente el 17-03-2026 donde se pisó okasa.cl. URL de preview temporal hasta 24-03-2026: https://studio-3718566942-edde2--galdi-kvavezsf.web.app

---

## 🔜 Pendiente / Próximos Pasos

- [ ] Reemplazar `hero-socias-vintage.jpg` por foto de productos (sin las hermanas)
- [ ] Deploy a producción: `firebase deploy --only hosting` (cuando DEV esté aprobado)
- [ ] Dominio personalizado (ej. `galdi.cl`) — configuración DNS en Firebase
- [ ] Sección **venta online** (fase futura)
- [ ] Imágenes profesionales de productos para la galería
- [ ] SEO básico: meta tags, Open Graph, sitemap
- [ ] Formulario de pedidos con integración backend (Firebase Functions o similar)

---

## 📞 Datos de Contacto del Negocio

| Campo | Valor |
|---|---|
| **WhatsApp** | +56 9 4021 1756 |
| **Ubicación** | Maipú, Región Metropolitana, Chile |
| **Instagram** | (pendiente confirmar) |

---

## 📝 Notas de Sesión

- **Estilo de trabajo de Claudio**: confirmaciones breves ("ya las pegué", "listo", "ahora sí mucho mejor") → Claude debe preguntar si el contexto es ambiguo antes de actuar
- **Paleta Galdi**: tonos café oscuro, crema cálido, dorado — identidad artesanal familiar
- **Audiencia**: clientes locales Maipú + B2B (distribución), eventos, delivery
