import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from './fa-icon'

export function Breadcrumbs() {
  return (
    <nav className="mx-side mt-5 sm:ml-2.5" data-qa="breadcrumbs">
      <a
        className="hidden sm:inline-block serlo-button mb-1 mr-5 py-0.5 font-normal after:absolute after:ml-3 after:text-gray-300 after:content-['>'] hover:bg-brand hover:text-white serlo-link"
        href="/mathe"
      >
        Mathematik
      </a>
      <a
        className="hidden sm:inline-block serlo-button mb-1 mr-5 py-0.5 font-normal after:absolute after:ml-3 after:text-gray-300 after:content-['>'] hover:bg-brand hover:text-white serlo-link"
        href="/mathe/247427/mittlerer-schulabschluss-an-der-mittelschule"
      >
        MSA an der Mittelschule
      </a>
      <a
        className="serlo-button bg-brand-200 py-0.5 hover:bg-brand-400 hover:text-white sm:bg-brand-100 sm:hover:bg-brand serlo-link"
        href="/mathe/293322/2023"
      >
        <span className="pr-1 pt-0.25 sm:hidden">
          <FaIcon icon={faFolderOpen} />
        </span>
        <span className="hidden pr-1 pt-0.25 text-base sm:inline">
          <FaIcon icon={faFolderOpen} />
        </span>
        2023
      </a>
    </nav>
  )
}
