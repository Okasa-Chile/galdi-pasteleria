"""
GALDI — Menú Almacenes EDITABLE
================================
Para regenerar: python Galdi-Menu-EDITABLE.py

AJUSTES PRINCIPALES:
- ALTURAS: cambia HDR_H, SOC_H, GAL_H para dar más/menos espacio
- Si se cortan las categorías: reduce HDR_H, SOC_H o GAL_H en ~20pt cada vez
- IMÁGENES: cambia los paths por los que necesites
- COLORES: modifica los HexColor al inicio
- TEXTO: edita los strings en INTRO y CATEGORIAS
"""

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

W, H = letter  # 612 x 792 pt

# ── COLORES ───────────────────────────────────────────────────────────────
GOLD  = colors.HexColor('#C9A55A')
CREAM = colors.HexColor('#F9F3EC')
CREAM2= colors.HexColor('#F2EAE0')
ROSE  = colors.HexColor('#F7EEE8')
SAND  = colors.HexColor('#EDE3D5')
BROWN = colors.HexColor('#3d2010')
MUTED = colors.HexColor('#9c7a5a')
GOLD2 = colors.HexColor('#7a5c2e')
WHITE = colors.white
LGOLD = colors.HexColor('#E8D5A8')
LBLUE = colors.HexColor('#B2D8E8')  # celeste pastel etiquetas galería

# ── ALTURAS DE SECCIONES (ajustar si hay cortes) ──────────────────────────
HDR_H  = 78   # Header con logo
SOC_H  = 88   # Sección socias
GAL_H  = 90   # Alto de cada foto en galería
GAL_PAD= 10    # Padding galería
FTR_H  = 28   # Footer

# ── PATHS DE IMÁGENES (rutas relativas desde galdi-nextjs/) ───────────────
P = 'public/images/'

IMG_LOGO   = P + 'logo-ancho.webp'
IMG_SOCIAS = P + 'Socias_lapiz.webp'
IMG_QR     = P + 'qr-whatsapp.png'

GALERIA = [
    (P + 'Torta de Piña.webp',      'Tortas'),
    (P + 'Marraquetas.webp',        'Pan'),
    (P + 'Berlines.webp',           'Dulces'),
    (P + 'Tartaletas.webp',   'Pasteles'),
]

CATEGORIAS = [
    (P + 'pan-amasado-new.webp', 'PAN ARTESANAL', 'Amasado a mano, receta familiar',
     [('Pan amasado','/ kg'),('Marraqueta','/ docena'),
      ('Dobladitas','/ docena'),('Tortilla chicharrones','/ kg')], CREAM),
    (P + 'muffins.webp', 'QUEQUES Y MUFFINS', 'Esponjosos, varios sabores',
     [('Queque naranja / mármol','/ unidad'),('Queque tradicional','/ unidad'),
      ('Muffins surtidos','/ docena')], ROSE),
    (P + 'empanada-pino.webp', 'EMPANADAS', 'Pedido mínimo: 1 docena',
     [('Pino / Napolitana','/ docena'),('Vegetariana / Queso camarón','/ docena')], SAND),
    (P + 'Berlines.webp', 'DULCES Y ALFAJORES', 'Recetas chilenas tradicionales',
     [('Alfajores maicena / manjar','/ docena'),('Chilenitos','/ docena'),
      ('Berlines','/ docena')], CREAM2),
    (P + 'Torta 3 Leches.webp', 'TORTAS POR ENCARGO', 'Para su vitrina y eventos',
     [('Tortas completas (varios sabores)','/ unidad'),
      ('Pasteles rectangulares','/ docena')], ROSE),
]

INTRO = [
    'Somos Jaqueline e Ingrid, dos hermanas de Maipú',
    'que elaboran productos artesanales con recetas',
    'familiares de generación en generación.',
    'Entrega fresca directo a su almacén.',
    'Factura disponible para empresas.',
]

# ── HELPER ────────────────────────────────────────────────────────────────
def draw_img(c, path, x, y, w, h):
    c.saveState()
    p = c.beginPath(); p.rect(x, y, w, h); c.clipPath(p, stroke=0)
    c.drawImage(path, x, y, width=w, height=h,
                preserveAspectRatio=True, anchor='n', mask='auto')
    c.restoreState()

# ── DRAW ──────────────────────────────────────────────────────────────────
def draw(c):
    y = H

    # HEADER
    y -= HDR_H
    c.setFillColor(CREAM); c.rect(0, y, W, HDR_H, fill=1, stroke=0)
    c.drawImage(IMG_LOGO, 14, y+6, width=130, height=64,
                preserveAspectRatio=True, mask='auto')

    # QR junto al logo
    QR = 52
    c.setFillColor(CREAM)
    c.roundRect(152, y+4, QR+10, QR+16, 4, fill=1, stroke=0)
    c.setStrokeColor(LGOLD); c.setLineWidth(0.5)
    c.roundRect(152, y+4, QR+10, QR+16, 4, fill=0, stroke=1)
    c.drawImage(IMG_QR, 157, y+8, width=QR, height=QR, mask='auto')
    c.setFillColor(GOLD2); c.setFont('Helvetica-Bold', 6.5)
    c.drawCentredString(157+QR/2, y+4, 'Escríbenos')

    c.setFillColor(GOLD2); c.setFont('Helvetica-Bold', 10)
    c.drawRightString(W-16, y+50, 'Distribución a almacenes')
    c.setFillColor(MUTED); c.setFont('Helvetica', 8.5)
    c.drawRightString(W-16, y+36, 'Maipú, Chile · Entrega directa a su negocio')
    c.setStrokeColor(GOLD); c.setLineWidth(1.5); c.line(0, y, W, y)
    c.setFillColor(GOLD2); c.setFont('Helvetica-Bold', 8.5)
    c.drawRightString(W-16, y+22, '+56 9 9099 1011')


    # SOCIAS
    y -= SOC_H
    c.setFillColor(SAND); c.rect(0, y, W, SOC_H, fill=1, stroke=0)
    draw_img(c, IMG_SOCIAS, 14, y+9, 76, 68)
    c.setStrokeColor(GOLD); c.setLineWidth(0.8)
    c.rect(14, y+9, 76, 68, fill=0, stroke=1)
    c.setFillColor(GOLD2); c.setFont('Helvetica-Bold', 8)
    c.drawString(102, y+70, 'QUIÉNES SOMOS')
    c.setFillColor(BROWN); c.setFont('Helvetica', 8.5)
    ty = y + 57
    for line in INTRO:
        c.drawString(102, ty, line); ty -= 11
    c.setStrokeColor(LGOLD); c.setLineWidth(0.5); c.line(0, y, W, y)

    # GALERÍA
    y -= (GAL_H + GAL_PAD)
    GAL_W = (W - 20) / 4 - 3
    c.setFillColor(ROSE); c.rect(0, y, W, GAL_H+GAL_PAD, fill=1, stroke=0)
    for i, (path, label) in enumerate(GALERIA):
        x = 10 + i * (GAL_W + 4)
        draw_img(c, path, x, y+4, GAL_W, GAL_H)
        # Etiqueta celeste pastel
        c.setFillColor(LBLUE)
        c.rect(x, y+4, GAL_W, 16, fill=1, stroke=0)
        c.setFillColor(BROWN); c.setFont('Helvetica-Bold', 7.5)
        c.drawCentredString(x+GAL_W/2, y+8, label)
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.line(0, y, W, y)

    # CATEGORÍAS
    IMG_W = 56; IMG_H = 50
    for path, titulo, desc, items, bg in CATEGORIAS:
        row_h = 38 + len(items) * 16
        y -= row_h
        c.setFillColor(bg); c.rect(0, y, W, row_h, fill=1, stroke=0)
        c.setStrokeColor(LGOLD); c.setLineWidth(0.4); c.line(0, y+row_h, W, y+row_h)
        draw_img(c, path, 10, y+4, IMG_W, IMG_H)
        c.setFillColor(GOLD2); c.setFont('Helvetica-Bold', 8.5)
        c.drawString(76, y+row_h-14, titulo)
        c.setFillColor(MUTED); c.setFont('Helvetica-Oblique', 8)
        c.drawString(76, y+row_h-25, desc)
        c.setStrokeColor(LGOLD); c.setLineWidth(0.4)
        c.line(76, y+row_h-28, W-14, y+row_h-28)
        iy = y + row_h - 40
        for nombre, unidad in items:
            c.setFillColor(GOLD); c.circle(80, iy+2.5, 2.2, fill=1, stroke=0)
            c.setFillColor(BROWN); c.setFont('Helvetica', 9)
            c.drawString(86, iy, nombre)
            nw = c.stringWidth(nombre, 'Helvetica', 9)
            c.setFillColor(MUTED); c.setFont('Helvetica', 7.5)
            c.drawString(86+nw+3, iy, unidad)
            c.setFillColor(GOLD2); c.setFont('Helvetica-Bold', 8.5)
            c.drawRightString(W-14, iy, 'Consultar')
            iy -= 16

    # FOOTER
    c.setFillColor(SAND); c.rect(0, 0, W, FTR_H, fill=1, stroke=0)
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.line(0, FTR_H, W, FTR_H)
    c.setFillColor(BROWN); c.setFont('Helvetica', 8)
    c.drawString(14, 16, '+56 9 9099 1011 · ventas@galdi.cl · @galdi_banqueteria')
    c.setFillColor(GOLD2); c.setFont('Helvetica-Bold', 8)
    c.drawRightString(W-14, 16, 'www.galdi.cl')
    c.setFillColor(MUTED); c.setFont('Helvetica', 7)
    c.drawString(14, 6, 'Productos 100% artesanales · Entrega directa en Maipú · Factura disponible')

    print(f"✅ y final = {y:.0f} | Margen libre = {y-FTR_H:.0f} pt")
    if y < FTR_H:
        print(f"⚠️ CORTE DETECTADO — reduce HDR_H+SOC_H+GAL_H en {FTR_H-y:.0f} pt en total")

if __name__ == '__main__':
    out = 'Galdi-Menu-Almacenes.pdf'
    c_obj = canvas.Canvas(out, pagesize=letter)
    draw(c_obj)
    c_obj.save()
    print(f"📄 PDF generado: {out}")