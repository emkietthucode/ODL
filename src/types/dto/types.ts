import { CauHoi, LuaChon } from '../types'

export interface QuestionDTO {
  question?: CauHoi
  answers?: LuaChon[]
  userAnswerId?: string
}

export interface LearningQuestionDTO {
  id: string
  noi_dung_cau_hoi: string
  ds_lua_chon: LuaChon[]
  cau_tra_loi?: string
  giai_thich?: string
  goi_y?: LuaChon[]
  hinh_anh?: number
}
