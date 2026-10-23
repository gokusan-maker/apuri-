import type { ReactNode } from 'react'
import type { Cheer } from './encourage'
import type { Form } from './monster'
import { MonsterFigure } from './MonsterView'

// どの画面でも、相棒が画面のはしから顔を出して励ましてくれる
// figure：文法・読解のページでは、そのページのなかまの姿を出す（ないときは単語の相棒）
export function PetCheer({ cheer, form, kind, onClose, figure }: { cheer: Cheer; form: Form; kind?: string; onClose: () => void; figure?: ReactNode }) {
  return (
    <div className="pet-cheer" role="status" onClick={onClose}>
      <span className="pet-cheer-face">
        {figure ?? <MonsterFigure form={form} kind={kind} mood="happy" />}
      </span>
      <span className="pet-cheer-bubble">
        <span className="pet-cheer-text">{cheer.text}</span>
        {cheer.lang === 'en' && <span className="pet-cheer-ja">{cheer.ja}</span>}
      </span>
    </div>
  )
}
