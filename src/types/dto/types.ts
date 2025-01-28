import { CauHoi, LuaChon } from '../types'

export interface QuestionDTO {
  question?: CauHoi
  answers?: LuaChon[]
  userAnswerIndex?: string
}
