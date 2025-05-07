export interface KhuVuc {
  id: string
  ten_khu_vuc: string
  quoc_ky: string
  ngon_ngu: string
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

export interface NgonNgu {
  id: string
  ten_ngon_ngu: string
  ky_hieu: string
  quoc_ky: string
}

export interface NguoiDung {
  id: string
  email: string
  ho_ten: string
  anh_dai_dien: string
  ngay_sinh: string
  vai_tro: string
  ma_khu_vuc: string
  ten_khu_vuc: string
  created_at: string
  updated_at: string
  gioi_tinh: string
}

export interface CauHoi {
  id: string
  noi_dung_cau_hoi: string
  hinh_anh: string
  giai_thich: string
  goi_y: string
  la_cau_diem_liet: boolean
  ma_chuong: string
  loai_cau_hoi: string
  created_at: Date
  updated_at: Date
}

export interface Chuong {
  id: string
  ten_chuong: string
  mo_ta_chuong: string
  ma_khu_vuc: string | null
  created_at: string
  updated_at: string
}

export interface LuaChon {
  id: string
  noi_dung_lua_chon: string
  la_lua_chon_dung: boolean
  ma_cau_hoi: string
  so_thu_tu: number
}
export interface Chuong {
  id: string
  ten_chuong: string
  mo_ta_chuong: string
  ma_khu_vuc: string | null
  created_at: string
  updated_at: string
}

export interface DeThi {
  id: string
  ten_de_thi: string
  loai_de_thi: string
  ma_cau_truc: string
  created_at: string
  updated_at: string
}
export interface CauTrucDeThi {
  id: string // UUID
  so_cau_de_dat: number
  so_cau_diem_liet: number
  thoi_gian_lam_bai: number
  ma_hang_bang: string // UUID
  created_at: string
  updated_at: string
  so_luong_cau_hoi: number
}

export interface LoTrinh {
  id: string
  ten_lo_trinh: string
  mo_ta_lo_trinh: string
  ma_hang_bang?: string
}
