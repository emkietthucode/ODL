export interface KhuVuc {
  id: string // UUID
  ten_khu_vuc: string | null // VARCHAR(50)
  quoc_ky: string | null // VARCHAR(100)
  ngon_ngu: string | null // VARCHAR(20)
  quoc_gia: string | null // UUID (nullable, foreign key)
  createdAt: Date // TIMESTAMPTZ
  updatedAt: Date // TIMESTAMPTZ
}
