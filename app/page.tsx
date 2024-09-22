'use client'

import { Heading } from '@radix-ui/themes'
import React, {
  useState,
  Component,
  createRef,
  ChangeEvent,
  useEffect,
} from 'react'
import { cn } from './helper/cn'

let currentId = 0

export default function Home() {
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { text: '', id: getNextId() },
  ])

  useEffect(() => {
    if (focusIndex !== null) {
      const textArea = document.querySelectorAll('textarea')[focusIndex]
      if (textArea) {
        textArea.focus()
        textArea.setSelectionRange(textArea.value.length, textArea.value.length)
        setFocusIndex(null)
      }
    }
  }, [focusIndex])

  return (
    <main className="mx-auto max-w-[720px] p-4">
      <Heading>TODO: Aufgabenstellung hier rendern</Heading>
      <div className="rounded border p-4 my-4">
        <div className="bg-orange-100">TODO: Toolbar</div>
        {paragraphs.map((paragraph, index) => (
          <>
            {index}
            <AutoHeightTextArea
              key={paragraph.id}
              className="w-full my-2 outline-none  border resize-none"
              value={paragraphs[index].text}
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
                  paragraphs[index].text === ''
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
                } else if (
                  e.key === 'ArrowDown' &&
                  index < paragraphs.length - 1
                ) {
                  setFocusIndex(index + 1)
                  e.preventDefault()
                }
              }}
              onChange={(text) => {
                const newParagraphs = [...paragraphs]
                newParagraphs[index] = {
                  ...newParagraphs[index],
                  text,
                }
                setParagraphs(newParagraphs)
              }}
            />
          </>
        ))}
        <div className="flex justify-end mt-2 space-x-2">
          <button className="button">Hilfe</button>
          <button className="button">Abschicken</button>
        </div>
      </div>
      <Heading>TODO: Musterlösung hier rendern</Heading>
    </main>
  )
}

interface Paragraph {
  text: string
  id: number
}

function getNextId(): number {
  return currentId++
}

interface AutoHeightTextAreaProps {
  value: string
  className: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

class AutoHeightTextArea extends Component<AutoHeightTextAreaProps> {
  private textArea = createRef<HTMLTextAreaElement>()

  componentDidMount() {
    this.adjustHeight()
  }

  componentDidUpdate() {
    this.adjustHeight()
  }

  adjustHeight = () => {
    if (this.textArea.current) {
      this.textArea.current.style.height = 'auto'
      this.textArea.current.style.height = `${this.textArea.current.scrollHeight}px`
    }
  }

  handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <textarea
        className={cn('resize-none overflow-hidden', this.props.className)}
        onKeyDown={this.props.onKeyDown}
        rows={1}
        ref={this.textArea}
        value={this.props.value}
        onChange={this.handleChange}
      />
    )
  }
}
