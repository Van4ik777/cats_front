import React, { useState } from 'react'
import { useSpyCats, useCreateSpyCat, useUpdateSpyCat, useDeleteSpyCat } from '../../lib/queries'
import { SpyCatList } from './SpyCatList'
import { SpyCatForm } from '../molecules/SpyCatForm'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { IconCat } from '@tabler/icons-react'

export const SpyCatDashboard = () => {
  const { data: spyCats, error, isLoading } = useSpyCats()
  const createMutation = useCreateSpyCat()
  const updateMutation = useUpdateSpyCat()
  const deleteMutation = useDeleteSpyCat()

  const [formError, setFormError] = useState<string | null>(null)

  const handleAddSpyCat = async (data: any) => {
    setFormError(null)
    try {
      await createMutation.mutateAsync(data)
    } catch (e: any) {
      setFormError(e.response?.data?.breed ? `Breed error: ${e.response.data.breed}` : e.message)
    }
  }

  const handleUpdateSalary = async (id: number, salary: number) => {
    setFormError(null)
    try {
      await updateMutation.mutateAsync({ id, data: { salary } })
    } catch (e: any) {
      setFormError(e.message)
      throw e
    }
  }

  const handleDeleteSpyCat = async (id: number) => {
    setFormError(null)
    try {
      await deleteMutation.mutateAsync(id)
    } catch (e: any) {
      setFormError(e.message)
    }
  }

  if (isLoading) return <h3 className="text-center text-gray-500 mt-12">Loading spy cats...</h3>
  if (error) return <ErrorMessage message="Failed to load spy cats." />

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 flex flex-col items-center">
      <h1 className="text-4xl font-semibold mb-6 flex items-center gap-3 text-gray-700">
        <IconCat size={36} stroke={1.5} />
        Spy Cats Management
      </h1>
      <div className="w-full max-w-md">
        <SpyCatForm onSubmit={handleAddSpyCat} loading={createMutation.isPending} error={formError || undefined} />
      </div>
      <div className="w-full">
        <SpyCatList
          spyCats={Array.isArray(spyCats) ? spyCats : []}
          onUpdateSalary={handleUpdateSalary}
          onDelete={handleDeleteSpyCat}
        />
      </div>
    </div>
  )
}
