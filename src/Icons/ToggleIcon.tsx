import cn from 'classnames'

export const ToggleIcon = ({ className }: { className?: string }) => (
  // A toggle switch icon that looks like a light switch
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   className={cn('w-6 h-6', className)}
  //   fill="none"
  //   viewBox="0 0 24 24"
  //   stroke="currentColor"
  // >
  //   {/* // A toggle switch icon that looks like a light switch */}
  //   <path
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={2}
  //     d="M13 7h.01M17 12h.01M13 17h.01M7 12h.01M5 10h14a2 2 0 012 2v0a2 2 0 01-2 2H5a2 2 0 01-2-2v0a2 2 0 012-2z"
  //   />
  // </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={cn('w-6 h-6', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)
