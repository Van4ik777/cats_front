import React, { useState } from 'react'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { FormField } from '../atoms/FormField' 

interface SpyCatFormProps {
  onSubmit: (data: { name: string; years_of_experience: number; breed: string; salary: number }) => void
  loading?: boolean
  error?: string
  initialData?: {
    name?: string
    years_of_experience?: number
    breed?: string
    salary?: number
  }
  isEdit?: boolean
}

export const SpyCatForm = ({ onSubmit, loading, error, initialData, isEdit = false }: SpyCatFormProps) => {
  const [name, setName] = useState(initialData?.name || '')
  const [years, setYears] = useState(initialData?.years_of_experience || 0)
  const [breed, setBreed] = useState(initialData?.breed || '')
  const [salary, setSalary] = useState(initialData?.salary || 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, years_of_experience: years, breed, salary })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md font-sans text-gray-800 space-y-4"
    >
      {!isEdit && (
        <>
          <FormField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormField
            id="years"
            label="Years of Experience"
            type="number"
            min={0}
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value, 10) || 0)}
            required
          />

          <FormField
            id="breed"
            label="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </>
      )}

      <FormField
        id="salary"
        label="Salary"
        type="number"
        min={0}
        value={salary}
        onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
        required
      />

      {error && <ErrorMessage message={error} />}

      <Button type="submit" disabled={loading} withCatIcon>
        {isEdit ? 'Update Salary' : 'Add Spy Cat'}
      </Button>
    </form>
  )
}
