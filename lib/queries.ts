import { useQuery, useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query'
import { fetchSpyCats, createSpyCat, updateSpyCat, deleteSpyCat } from './api'
import { SpyCat } from '../utils/types'

export function useSpyCats() {
  return useQuery<SpyCat[], Error>({
    queryKey: ['spyCats'],
    queryFn: fetchSpyCats,
  })
}


type CreateSpyCatInput = Omit<SpyCat, 'id'>

export function useCreateSpyCat(): UseMutationResult<SpyCat, unknown, CreateSpyCatInput> {
  const queryClient = useQueryClient()
    return useMutation({
    mutationFn: createSpyCat,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['spyCats'] }),
    })
}


type UpdateSpyCatInput = { id: number; data: Partial<Omit<SpyCat, 'id'>> }

export function useUpdateSpyCat(): UseMutationResult<
  SpyCat,
  unknown,
  UpdateSpyCatInput
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: UpdateSpyCatInput) => updateSpyCat(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['spyCats'] }),
  })
}


export function useDeleteSpyCat(): UseMutationResult<void, unknown, number> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteSpyCat(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['spyCats'] }),
  })
}
