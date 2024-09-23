import { faFile, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from './fa-icon'
import { SerloRenderer } from '@serlo/editor'
import { SampleSolution } from './sample-solution'

export default function Task({ children }: { children: JSX.Element }) {
  return (
    <div>
      <h1 className="serlo-h1 mb-10 mt-8">
        Teil A <FaIcon className="text-2xl text-brand-300" icon={faFile} />
      </h1>
      <div className="my-block">
        <p className="slate-p serlo-p mb-0 min-h-[1.33em]">
          Bearbeite diese Aufgaben ohne Hilfsmittel.
        </p>
        <p className="slate-p serlo-p mb-0 min-h-[1.33em]">
          <a
            href="https://pruefungsarchiv.mebis.bycs.de/archiv.php?doc=display&amp;id=BY-00303690"
            className="serlo-link"
          >
            Hier
            <FaIcon
              className="ml-1 align-baseline text-xs"
              icon={faSquareArrowUpRight}
            />
          </a>{' '}
          sind die originalen Abschlussaufgaben als PDF.{' '}
        </p>
        <p className="slate-p serlo-p mb-0 min-h-[1.33em]"></p>
      </div>

      <div className="my-block">
        <p className="serlo-p">Löse die folgenden Aufgaben:</p>
      </div>

      <ol className="mb-2.5 ml-2 bg-white pb-3.5 [counter-reset:exercises] sm:pl-12">
        <li
          id="295515"
          className="serlo-exercise-wrapper serlo-grouped-exercise-wrapper mt-6 pt-2 [&>div]:border-none"
        >
          <div className="relative">
            <div className="absolute -right-8 -mt-1"></div>
            <div className="-mt-block">
              <div className="mb-block relative -top-3">
                {/* CONTENT */}
                <SerloRenderer
                  state={{
                    plugin: 'rows',
                    state: [
                      {
                        plugin: 'text',
                        state: [
                          {
                            type: 'p',
                            children: [
                              { text: 'Gegeben ist die Gerade  ' },
                              {
                                type: 'math',
                                src: 'g: y = 2x − 1.',
                                inline: true,
                                children: [{ text: '' }],
                              },
                              { text: '' },
                            ],
                          },
                          {
                            type: 'p',
                            children: [
                              {
                                text: 'Überprüfen Sie rechnerisch, ob der Punkt ',
                              },
                              {
                                type: 'math',
                                src: 'P (4 | 6)',
                                inline: true,
                                children: [{ text: '' }],
                              },
                              { text: ' auf der Geraden ' },
                              {
                                type: 'math',
                                src: 'g',
                                inline: true,
                                children: [{ text: '' }],
                              },
                              { text: ' liegt.' },
                            ],
                          },
                          { type: 'p', children: [{ text: '' }] },
                        ],
                      },
                    ],
                  }}
                  editorVariant={'serlo-org'}
                />
                {children}
              </div>
            </div>
          </div>{' '}
          <SampleSolution />
        </li>
        <li className="serlo-exercise-wrapper serlo-grouped-exercise-wrapper mt-24 pt-2 [&amp;>div]:border-none">
          <div className="relative">
            <div className="absolute -right-8 -mt-1"></div>
            <div className="-mt-block">
              <SerloRenderer
                editorVariant="serlo-org"
                state={{
                  plugin: 'rows',
                  state: [
                    {
                      plugin: 'exercise',
                      state: {
                        content: {
                          plugin: 'rows',
                          state: [
                            {
                              plugin: 'text',
                              state: [
                                {
                                  type: 'p',
                                  children: [
                                    {
                                      text: 'Erklären Sie, woran Sie anhand der Funktionsgleichungen zweier Geraden erkennen können, dass die Geraden zueinander parallel sind.',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        solution: {
                          plugin: 'solution',
                          state: {
                            strategy: {
                              plugin: 'text',
                              state: [{ type: 'p', children: [{ text: '' }] }],
                            },
                            steps: {
                              plugin: 'rows',
                              state: [
                                {
                                  plugin: 'text',
                                  state: [
                                    {
                                      type: 'p',
                                      children: [
                                        {
                                          text: 'Gegeben sind die zwei Geraden ',
                                        },
                                        {
                                          type: 'math',
                                          src: 'g',
                                          inline: true,
                                          children: [{ text: '' }],
                                        },
                                        { text: ' und ' },
                                        {
                                          type: 'math',
                                          src: 'h',
                                          inline: true,
                                          children: [{ text: '' }],
                                        },
                                        {
                                          text: ' mit den folgenden Funktionsgleichungen:',
                                        },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  plugin: 'text',
                                  state: [
                                    {
                                      type: 'p',
                                      children: [
                                        { text: '' },
                                        {
                                          type: 'math',
                                          src: 'g: y = m_1x+t_1\\\\h: y = m_2x + t_2',
                                          inline: true,
                                          children: [{ text: '' }],
                                        },
                                        { text: '' },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  plugin: 'text',
                                  state: [
                                    {
                                      type: 'p',
                                      children: [
                                        {
                                          text: 'Wenn die Steigungen der beiden Geraden gleich sind, also wenn  ',
                                        },
                                        {
                                          type: 'math',
                                          src: 'm_1=m_2',
                                          inline: true,
                                          children: [{ text: '' }],
                                        },
                                        {
                                          text: ',  dann sind die beiden Geraden parallel.',
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            prerequisite: {
                              id: '27781',
                              title: 'Parallele Geraden',
                            },
                          },
                        },
                      },
                    },
                  ],
                }}
              />
            </div>
          </div>{' '}
        </li>
      </ol>
    </div>
  )
}
