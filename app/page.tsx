'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Breadcrumbs } from './components/breadcumbs'
import { Task } from './components/task'
import { LearnerAnswer } from './components/learner-answer'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="mx-auto max-w-[720px] pt-12 pb-40">
        <Breadcrumbs />
        <Task>
          <LearnerAnswer />
        </Task>
      </main>
    </QueryClientProvider>
  )
}
