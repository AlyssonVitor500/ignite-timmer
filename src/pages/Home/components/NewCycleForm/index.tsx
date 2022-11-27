import { FormContainer } from '../../styles'
import { MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function NewCycleForm() {
  const { activeCycle, cycles } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
        autoComplete="off"
      />

      <datalist id="task-suggestions">
        {cycles.length > 0 &&
          cycles
            .slice(-3)
            .map((cycle) => <option key={cycle.id} value={cycle.task} />)}
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
