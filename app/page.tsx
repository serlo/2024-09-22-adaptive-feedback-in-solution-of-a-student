'use client'

import React, {
  useState,
  Component,
  createRef,
  ChangeEvent,
  useEffect,
} from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query'
import { cn } from './helper/cn'
import { Feedback } from './types'

const queryClient = new QueryClient()

let currentId = 0

const exercise = `Gegeben ist die Gerade g:y=2x−1.

Überprüfen Sie rechnerisch, ob der Punkt P(4∣6) auf der Geraden g liegt.`

const solution = `x=4 in die Geradengleichung eingesetzt ergibt y=2⋅4−1=8−1=7

Nun stimmt y=7 nicht mit der y-Koordinate des Punktes P (4|6) überein.

Damit liegt der Punkt P nicht auf der Geraden g.`

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {' '}
      <main className="mx-auto max-w-[720px] p-4">
        <div>
          TODO: Aufgabenstellung hier rendern
          <br />
          <br /> {exercise}
        </div>
        <SolutionArea />
        <div>
          TODO: Musterlösung hier rendern
          <br />
          <br /> {solution}
        </div>
      </main>
    </QueryClientProvider>
  )
}

function SolutionArea() {
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { text: '', id: getNextId() },
  ])

  // TOOO: Add possibility to stop fetching feedback
  const fetchFeedback = useMutation({
    mutationFn: async () => {
      const url = new URL('/api/generate-feedback', window.location.href)

      url.searchParams.append('exercise', exercise)
      url.searchParams.append('solution', solution)
      url.searchParams.append('studentSolution', JSON.stringify(paragraphs))

      const response = await fetch(url.toString(), { method: 'POST' })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return response.json() as Promise<Feedback>
    },
    onSuccess: (data) => {
      console.log(data)
    },
  })

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
    <div className="rounded border p-4 my-4">
      <div className="bg-orange-100">TODO: Toolbar</div>
      {paragraphs.map((paragraph, index) => (
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
            } else if (e.key === 'Backspace' && paragraphs[index].text === '') {
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
          onChange={(text) => {
            const newParagraphs = [...paragraphs]
            newParagraphs[index] = {
              ...newParagraphs[index],
              text,
            }
            setParagraphs(newParagraphs)
          }}
        />
      ))}
      <div className="flex justify-end mt-2 space-x-2">
        <button className="button" onClick={() => fetchFeedback.mutate()}>
          Hilfe
        </button>
        <button className="button" onClick={() => fetchFeedback.mutate()}>
          Abschicken
        </button>
      </div>
    </div>
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
