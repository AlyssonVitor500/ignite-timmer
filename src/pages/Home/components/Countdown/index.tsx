import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'

import taskFinishedAudio from '../../../../assets/task-finished-audio.mp3'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amoutSecondsPassed,
    changeAmountSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        changeAmountSecondsPassed(
          differenceInSeconds(new Date(), new Date(activeCycle.startDate)),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, changeAmountSecondsPassed])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`

      if (amoutSecondsPassed >= totalSeconds) {
        document.title = `Ignite Timer`
        markCurrentCycleAsFinished()

        const audio = new Audio(taskFinishedAudio)
        audio.play()

        setTimeout(() => alert('Fim da contagem!'), 1000)
      }
    }
  }, [
    activeCycle,
    amoutSecondsPassed,
    minutes,
    seconds,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
