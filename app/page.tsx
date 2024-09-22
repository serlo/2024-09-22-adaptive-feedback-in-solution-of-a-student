'use client'

import { Heading } from '@radix-ui/themes'

export default function Home() {
  return (
    <main className="mx-auto max-w-[720px] p-4">
      <Heading>TODO: Aufgabenstellung hier rendern</Heading>
      <div className="rounded border p-4 my-4">
        <div className="bg-orange-100">TODO: Toolbar</div>
        <div className="flex justify-end mt-2 space-x-2">
          <button className="button">Hilfe</button>
          <button className="button">Abschicken</button>
        </div>
      </div>
      <Heading>TODO: Musterlösung hier rendern</Heading>
    </main>
  )
}
