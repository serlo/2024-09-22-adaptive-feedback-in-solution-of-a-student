'use client'

import type { Paragraph } from '../types'
import { getNextId } from './learner-answer'

export function AnswerTextArea({
  paragraph,
  index,
  paragraphs,
  setParagraphs,
  setFocusIndex,
  onChange,
}: {
  paragraph: Paragraph
  index: number
  paragraphs: Paragraph[]
  setParagraphs: (paragraphs: Paragraph[]) => void
  setFocusIndex: (index: number) => void
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
    paragraphId: number,
  ) => void
}) {
  return (
    <textarea
      key={paragraph.id}
      className="w-full mb-1 ml-0.5 pr-20 outline-none h-7 resize-none text-xl relative z-[101]"
      value={paragraph.text}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setParagraphs([
            ...paragraphs.slice(0, index + 1),
            { text: '', id: getNextId() },
            ...paragraphs.slice(index + 1),
          ])
          setFocusIndex(index + 1)
          e.preventDefault()
        } else if (
          e.key === 'Backspace' &&
          paragraphs[index].text === '' &&
          index > 0
        ) {
          setParagraphs([
            ...paragraphs.slice(0, index),
            ...paragraphs.slice(index + 1),
          ])
          setFocusIndex(index - 1)
          e.preventDefault()
        } else if (e.key === 'ArrowUp' && index > 0) {
          setFocusIndex(index - 1)
          e.preventDefault()
        } else if (e.key === 'ArrowDown' && index < paragraphs.length - 1) {
          setFocusIndex(index + 1)
          e.preventDefault()
        }
      }}
      onChange={(e) => onChange(e, index, paragraph.id)}
    />
  )
}
