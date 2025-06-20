import React from 'react'
import { SpyCatItem } from '../molecules/SpyCatItem'

interface SpyCat {
  id: number
  name: string
  years_of_experience: number
  breed: string
  salary: number
}

interface SpyCatListProps {
  spyCats: SpyCat[]
  onUpdateSalary: (id: number, salary: number) => Promise<void>
  onDelete: (id: number) => void
}

export const SpyCatList = ({ spyCats, onUpdateSalary, onDelete }: SpyCatListProps) => {
  if (spyCats.length === 0) return     <div
      style={{
        height: '60vh',   
        fontSize: 22,
        fontWeight: 600,
        marginTop: '2vh',
        color: '#555',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: 'none',
        textAlign: 'center',
        padding: '0 20px',
      }}
    >
      No cats available
    </div>

  return (
    <div>
      {spyCats.map(cat => (
        <SpyCatItem key={cat.id} spyCat={cat} onUpdateSalary={onUpdateSalary} onDelete={onDelete} />
      ))}
    </div>
  )
}
