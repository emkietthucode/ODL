export interface KhuVuc {
  id: string // UUID
  ten_khu_vuc: string | null // VARCHAR(50)
  quoc_ky: string | null // VARCHAR(100)
  ngon_ngu: string | null // VARCHAR(20)
  quoc_gia: string | null // UUID (nullable, foreign key)
  createdAt: Date // TIMESTAMPTZ
  updatedAt: Date // TIMESTAMPTZ
}
export interface HangBang {
  id: string // UUID
  ten_hang_bang: string
  mo_ta_hang_bang?: string
  ma_khu_vuc: string
  createdAt: string
  updatedAt: string
}
