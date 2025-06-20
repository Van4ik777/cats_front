import axios from 'axios'
import { SpyCat } from '../utils/types'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
})


export const fetchSpyCats = (): Promise<SpyCat[]> =>
  api.get('/spy-cats/').then(res => res.data)

export const createSpyCat = (data: Omit<SpyCat, 'id'>): Promise<SpyCat> =>
  api.post('/spy-cats/', data).then(res => res.data)

export const updateSpyCat = (id: number, data: Partial<Omit<SpyCat, 'id'>>): Promise<SpyCat> =>
  api.patch(`/spy-cats/${id}/`, data).then(res => res.data)

export const deleteSpyCat = (id: number): Promise<any> =>
  api.delete(`/spy-cats/${id}/`).then(res => res.data)
