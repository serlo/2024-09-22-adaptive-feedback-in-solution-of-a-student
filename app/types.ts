import * as t from 'io-ts'

const SpecificFeedback = t.type({
  paragraphId: t.number,
  feedback: t.string,
  isCorrect: t.boolean,
})

export const Feedback = t.type({
  generalFeedback: t.string,
  isCorrect: t.boolean,
  specificFeedback: t.array(SpecificFeedback),
})
export type Feedback = t.TypeOf<typeof Feedback>

export interface Paragraph {
  text: string
  id: number
}
