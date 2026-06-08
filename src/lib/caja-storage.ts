import { MovimientoCaja } from '@/types'

const STORAGE_KEY = 'iesfuego-caja-movimientos'

export function getMovimientos(): MovimientoCaja[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try { return JSON.parse(data) } catch { return [] }
}

export function saveMovimiento(m: MovimientoCaja) {
  const movs = getMovimientos()
  movs.push(m)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movs))
}

export function seedDemoData() {
  const existing = getMovimientos()
  if (existing.length > 0) return

  const demo: MovimientoCaja[] = [
    {
      id: '1', tipo: 'ingreso', categoria: 'ofrendas', monto: 8500, concepto: 'Ofrenda dominical',
      fecha: '2026-06-07', ingresadoPor: 'Pastor Juan', descripcion: 'Ofrenda del culto matutino', creadoEn: Date.now() - 86400000 * 6,
    },
    {
      id: '2', tipo: 'ingreso', categoria: 'donaciones', monto: 3000, concepto: 'Donación mensual',
      fecha: '2026-06-05', ingresadoPor: 'Hna. María', descripcion: 'Donación de hermana María', creadoEn: Date.now() - 86400000 * 4,
    },
    {
      id: '3', tipo: 'ingreso', categoria: 'actividades', monto: 2500, concepto: 'Venta de comida actividad',
      fecha: '2026-06-01', ingresadoPor: 'Hno. Pedro', firmaTesorera: 'Sra. Ana López', creadoEn: Date.now() - 86400000 * 8,
    },
    {
      id: '4', tipo: 'egreso', categoria: 'luz', monto: 1200, concepto: 'Pago de electricidad',
      fecha: '2026-06-03', ingresadoPor: 'Tesorero', descripcion: 'Recibo de luz junio', creadoEn: Date.now() - 86400000 * 5,
    },
    {
      id: '5', tipo: 'egreso', categoria: 'agua', monto: 600, concepto: 'Pago de agua',
      fecha: '2026-06-02', ingresadoPor: 'Tesorero', descripcion: 'Recibo de agua junio', creadoEn: Date.now() - 86400000 * 6,
    },
    {
      id: '6', tipo: 'egreso', categoria: 'evento', monto: 3500, concepto: 'Compra de alimentos actividad',
      fecha: '2026-05-30', ingresadoPor: 'Hno. Pedro', descripcion: 'Para actividad de jóvenes', creadoEn: Date.now() - 86400000 * 10,
    },
    {
      id: '7', tipo: 'ingreso', categoria: 'ofrendas', monto: 7200, concepto: 'Ofrenda de miércoles',
      fecha: '2026-05-28', ingresadoPor: 'Pastor Juan', creadoEn: Date.now() - 86400000 * 12,
    },
    {
      id: '8', tipo: 'egreso', categoria: 'mantenimiento', monto: 2000, concepto: 'Reparación de techo',
      fecha: '2026-05-25', ingresadoPor: 'Tesorero', descripcion: 'Gotera en el templo', creadoEn: Date.now() - 86400000 * 15,
    },
    {
      id: '9', tipo: 'ingreso', categoria: 'donaciones', monto: 5000, concepto: 'Donación especial',
      fecha: '2026-05-20', ingresadoPor: 'Pastor Juan', descripcion: 'Donación de hermano visitante', creadoEn: Date.now() - 86400000 * 20,
    },
    {
      id: '10', tipo: 'egreso', categoria: 'telefono', monto: 800, concepto: 'Pago de internet',
      fecha: '2026-05-18', ingresadoPor: 'Tesorero', creadoEn: Date.now() - 86400000 * 22,
    },
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(demo))
}
