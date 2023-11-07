import cn from 'classnames'

export const Button = ({
  type,
  style,
  children,
  onClick,
}: {
  type?: 'submit' | 'reset'
  style: 'success' | 'danger'
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  const buttonStyle = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
  }

  return (
    <button type={type && type} className={cn('px-4 py-2 text-white uppercase font-italic', buttonStyle[style])} onClick={onClick && onClick}>
      {children}
    </button>
  )
}
