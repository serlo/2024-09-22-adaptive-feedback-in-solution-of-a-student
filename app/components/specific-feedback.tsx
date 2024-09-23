'use client'

import { cn } from '../helper/cn'
import AnimateHeight from 'react-animate-height'
import { Feedback } from '../types'
import { FaIcon } from './fa-icon'
import {
  faCheckCircle,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'

export function SpecificFeedback({
  specificFeedback,
  isOpen,
  onToggle,
}: {
  specificFeedback: Feedback['specificFeedback'][number]
  isOpen: boolean
  onToggle: () => void
}) {
  const { isCorrect, feedback } = specificFeedback

  return (
    <>
      <button
        onClick={onToggle}
        className={cn(
          'absolute z-[101] right-0 -top-1',
          'h-9 w-9 rounded-full flex items-center justify-center',
          isCorrect ? 'bg-green-100' : 'bg-blue-100',
        )}
      >
        <FaIcon icon={isCorrect ? faCheckCircle : faCircleExclamation} />
      </button>
      <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
        <div
          className={cn(
            'flex mb-4 p-3 rounded-lg',
            isCorrect ? 'bg-green-100' : 'bg-blue-100',
          )}
        >
          <img
            src="/birdie.svg"
            alt="Birdie"
            width={50}
            height={50}
            className="w-24 h-24 mx-4"
          />
          <p>{feedback}</p>
        </div>
      </AnimateHeight>
    </>
  )
}
