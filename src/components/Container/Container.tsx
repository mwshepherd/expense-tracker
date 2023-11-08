import cn from 'classnames'

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export const Container = ({ className, children, ...props }: ContainerProps) => (
  <div className={cn('max-w-7xl mx-auto px-2 sm:px-6 lg:px-8', className)} {...props}>
    {children}
  </div>
)
