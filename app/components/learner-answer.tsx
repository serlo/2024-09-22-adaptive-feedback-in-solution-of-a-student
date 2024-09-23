'use client'

import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { cn } from '../helper/cn'
import { Feedback, Paragraph } from '../types'
import { AnswerTextArea } from './answer-text-area'
import { FaIcon } from './fa-icon'
import {
  faBold,
  faItalic,
  faSpinner,
  faSquareRootVariable,
} from '@fortawesome/free-solid-svg-icons'
import { SpecificFeedback } from './specific-feedback'

let currentId = 0

const exercise = `Gegeben ist die Gerade g:y=2x−1.

Überprüfen Sie rechnerisch, ob der Punkt P(4∣6) auf der Geraden g liegt.`

const solution = `x=4 in die Geradengleichung eingesetzt ergibt y=2⋅4−1=8−1=7

Nun stimmt y=7 nicht mit der y-Koordinate des Punktes P (4|6) überein.

Damit liegt der Punkt P nicht auf der Geraden g.`

export function LearnerAnswer() {
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { text: '', id: getNextId() },
  ])
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const showGeneralFeedback = useRef<boolean>(false)

  const [openFeedbackParagraphId, setOpenFeedbackParagraphId] = useState<
    number | null
  >(null)

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
      setFeedback(data)
    },
  })

  const updateFeedback = (isGeneral: boolean, paragraphId?: number) => {
    console.log({ paragraphId })
    setOpenFeedbackParagraphId(paragraphId ?? null)
    showGeneralFeedback.current = isGeneral
    fetchFeedback.mutate()
    setFeedback(null)
  }

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

  ReactDOM.preload('/birdie.svg', { as: 'image' })

  function handleTextAreaChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
    paragraphId: number,
  ) {
    const text = e.target.value
    const newParagraphs = [...paragraphs]
    newParagraphs[index] = {
      ...newParagraphs[index],
      text,
    }
    showGeneralFeedback.current = false
    setParagraphs(newParagraphs)
    setFeedback((prev) => {
      if (prev === null) return null

      return {
        ...prev,
        specificFeedback: prev.specificFeedback.filter(
          (x) => x.paragraphId !== paragraphId,
        ),
      }
    })
  }

  return (
    <>
      <h3 className="font-bold mx-side text-editor-primary -mt-5">
        Deine Antwort:
      </h3>
      <div className="rounded-xl border-3 mx-side p-4 mt-1 mb-4 border-editor-primary-100">
        <nav className="flex gap-1 mb-2">
          <button className="rounded w-8 h-8 bg-editor-primary-50 hover:bg-editor-primary-100 transition-colors">
            <FaIcon icon={faBold} />
          </button>
          <button className="rounded w-8 h-8 bg-editor-primary-50 hover:bg-editor-primary-100 transition-colors">
            <FaIcon icon={faItalic} />
          </button>
          <button className="rounded w-8 h-8 bg-editor-primary-50 hover:bg-editor-primary-100 transition-colors">
            <FaIcon icon={faSquareRootVariable} />
          </button>
        </nav>
        {paragraphs.map((paragraph, index) => {
          const specificFeedback = feedback?.specificFeedback?.find(
            (x) => x.paragraphId === paragraph.id,
          )
          const isOpen = openFeedbackParagraphId === paragraph.id

          return (
            <div className="relative group" key={index}>
              <AnswerTextArea
                paragraph={paragraph}
                index={index}
                paragraphs={paragraphs}
                setParagraphs={setParagraphs}
                setFocusIndex={setFocusIndex}
                onChange={handleTextAreaChange}
              />

              {specificFeedback && paragraph.text ? (
                <SpecificFeedback
                  specificFeedback={specificFeedback}
                  isOpen={isOpen}
                  onToggle={() =>
                    setOpenFeedbackParagraphId(isOpen ? null : paragraph.id)
                  }
                />
              ) : (
                <button
                  onClick={
                    fetchFeedback.isPending
                      ? () => void 0
                      : () => updateFeedback(false, paragraph.id)
                  }
                  className={cn(
                    'absolute z-[101] right-0 top-0 serlo-button-light opacity-0',
                    'group-focus-within:opacity-100',
                  )}
                >
                  🐦 Hilfe
                </button>
              )}
            </div>
          )
        })}
      </div>
      {feedback !== null && showGeneralFeedback.current ? (
        <div
          className={cn(
            'flex justify-start space-x-4 mt-4 mx-side',
            feedback.isCorrect ? 'bg-green-100' : 'bg-blue-100',
            'rounded-lg p-3',
          )}
        >
          <p className="text-2xl">{feedback.isCorrect ? '🎉' : '✋'}</p>
          <p>{feedback.generalFeedback}</p>
        </div>
      ) : (
        <div className="mx-side text-right">
          <button
            className={cn(
              'serlo-button-light opacity-0 transition-opacity',
              paragraphs.find((p) => p.text.length) &&
                !showGeneralFeedback.current &&
                'opacity-100',
              fetchFeedback.isPending && 'opacity-100',
            )}
            onClick={() =>
              fetchFeedback.isPending ? () => void 0 : updateFeedback(true)
            }
          >
            {fetchFeedback.isPending ? (
              <FaIcon icon={faSpinner} className="animate-spin-slow" />
            ) : (
              'Abschicken'
            )}
          </button>
        </div>
      )}
    </>
  )
}

export function getNextId(): number {
  return currentId++
}
