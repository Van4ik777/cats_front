export interface Target {
  id: number
  mission: number
  name: string
  country: string
  notes: string
  is_completed: boolean
}

export interface Mission {
  id: number
  cat: number | null
  is_completed: boolean
  targets: Target[]
}

export interface SpyCat{
  id: number
  name: string
  years_of_experience: number
  breed: string
  salary: number
  mission?: Mission | null  
}