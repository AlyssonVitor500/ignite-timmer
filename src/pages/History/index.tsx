import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import {
  EmptyTableMessage,
  HistoryContainer,
  HistoryList,
  Status,
} from './styles'

import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { NavLink } from 'react-router-dom'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.length === 0 && (
              <EmptyTableMessage>
                <td colSpan={4}>
                  Você ainda não iniciou uma tarefa,{' '}
                  <NavLink to="/">que tal criar uma agora?</NavLink>
                </td>
              </EmptyTableMessage>
            )}
            {cycles.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.task}</td>

                  <td>{item.minutesAmount} minutos</td>

                  <td>
                    {formatDistanceToNow(new Date(item.startDate), {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </td>

                  <td>
                    {!!item.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {!!item.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {!item.finishedDate && !item.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
