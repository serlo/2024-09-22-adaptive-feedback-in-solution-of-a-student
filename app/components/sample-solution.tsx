import { SerloRenderer } from '@serlo/editor'

export function SampleSolution() {
  return (
    <div className="relative wrapper">
      <nav>
        <button
          onClick={(e) => {
            const wrapper = (e.target as HTMLElement).closest('.wrapper')
            wrapper
              ?.querySelector('.serlo-solution-box')
              ?.classList.toggle('hidden')
            wrapper?.querySelector('.strategy-box')?.classList.toggle('hidden')
          }}
          className="serlo-button-blue-transparent mb-4 ml-side mr-auto pr-2 text-base hover:bg-brand-100 hover:text-brand-700"
        >
          <span className="w-3.5">
            <span className="inline-block transition-transform duration-300">
              ▾
            </span>
            &nbsp;
          </span>
          Strategie
        </button>{' '}
        <button
          onClick={(e) => {
            const wrapper = (e.target as HTMLElement).closest('.wrapper')
            wrapper
              ?.querySelector('.serlo-solution-box')
              ?.classList.toggle('hidden')
            wrapper?.querySelector('.solution-box')?.classList.toggle('hidden')
          }}
          className="serlo-button-blue-transparent mb-4 ml-side mr-auto pr-2 text-base hover:bg-brand-100 hover:text-brand-700"
        >
          <span className="w-3.5">
            <span className="inline-block transition-transform duration-300">
              ▾
            </span>
            &nbsp;
          </span>
          Lösungsvorschlag
        </button>
      </nav>
      <div className="serlo-solution-box hidden">
        <div className="hidden strategy-box">
          <SerloRenderer
            editorVariant="serlo-org"
            state={{
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [
                        { text: 'Setze die x-Koordinaten des Punktes ' },
                        {
                          type: 'math',
                          src: 'P',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: ' in die Gleichung  ' },
                        {
                          type: 'math',
                          src: 'g',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: ' ein.' },
                      ],
                    },
                  ],
                },
              ],
            }}
          />
        </div>
        <div className="hidden solution-box">
          <SerloRenderer
            editorVariant="serlo-org"
            state={{
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [
                    {
                      type: 'p',
                      children: [
                        { text: '' },
                        {
                          type: 'math',
                          src: 'y=2\\cdot 4-1',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: '' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: '' },
                        {
                          type: 'math',
                          src: 'y=8-1=7',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: '' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: '' },
                        {
                          type: 'math',
                          src: '7\\neq6',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: '' },
                      ],
                    },
                    { type: 'p', children: [{ text: '' }] },
                    {
                      type: 'p',
                      children: [
                        { text: '' },
                        {
                          type: 'math',
                          src: 'y=7',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        {
                          text: ' stimmt nicht mit der y-Koordinate des Punktes P (',
                        },
                        {
                          type: 'math',
                          src: 'y=6',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: ') überein. ' },
                      ],
                    },
                    {
                      type: 'p',
                      children: [
                        { text: '=> Der Punkt ' },
                        {
                          type: 'math',
                          src: 'P',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: ' liegt nicht auf der Geraden ' },
                        {
                          type: 'math',
                          src: 'g',
                          inline: true,
                          children: [{ text: '' }],
                        },
                        { text: '.' },
                      ],
                    },
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  )
}
