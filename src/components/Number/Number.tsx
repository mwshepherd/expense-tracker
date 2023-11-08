import { useSpring, animated } from '@react-spring/web'
import { memo } from 'react'

const NumAnim = ({ n }: { n: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 0,
    config: { mass: 1, tension: 20, friction: 10, duration: 500 },
  })

  return <animated.span>{number.to((n) => n.toFixed(2))}</animated.span>
}

export default memo(NumAnim)
