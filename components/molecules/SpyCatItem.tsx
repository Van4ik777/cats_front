import React, { useState, useRef, useEffect } from 'react'
import { IconCat, IconEdit, IconTrash } from '@tabler/icons-react'
import { SpyCat,Target, Mission } from '../../utils/types'


interface SpyCatItemProps {
  spyCat: SpyCat
  onUpdateSalary: (id: number, salary: number) => Promise<void>
  onDelete: (id: number) => void
}

export const SpyCatItem = ({ spyCat, onUpdateSalary, onDelete }: SpyCatItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [salaryInput, setSalaryInput] = useState(spyCat.salary.toString())
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [isDeleting, setIsDeleting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDeleteClick = () => {
    setIsDeleting(true)
  }

  useEffect(() => {
    if (isDeleting) {
      const timeout = setTimeout(() => {
        onDelete(spyCat.id)
      }, 800) 

      return () => clearTimeout(timeout)
    }
  }, [isDeleting, onDelete, spyCat.id])

  const handleUpdate = async () => {
    const salaryNumber = Number(salaryInput)
    if (isNaN(salaryNumber) || salaryNumber < 0) {
      setError('Please enter a valid salary')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await onUpdateSalary(spyCat.id, salaryNumber)
      setIsEditing(false)
    } catch (e: any) {
      setError(e.message || 'Failed to update salary')
    } finally {
      setLoading(false)
    }
  }

  const styles = {
    card: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9fafb',
      borderRadius: 16,
      padding: 24,
      width: '80%',
      maxWidth: 600,
      minWidth: 320,
      margin: '20px auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #ddd',
      opacity: isDeleting ? 0 : 1,
      transform: isDeleting ? 'translateY(20px)' : 'translateY(0)',
      transition: 'opacity 500ms ease, transform 500ms ease',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 20,
      fontWeight: 600,
      color: '#222222',
    },
    breedExperience: {
      fontSize: 14,
      color: '#555555',
      fontStyle: 'italic',
      marginTop: 6,
    },
    salaryText: {
      color: '#16a34a', 
      fontWeight: 700,
      fontSize: 22,
      marginTop: 14,
      userSelect: 'none' as const,
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      fontSize: 16,
      borderRadius: 12,
      border: '1.5px solid #bbb',
      outline: 'none',
      marginTop: 8,
      boxSizing: 'border-box' as const,
    },
    error: {
      fontSize: 12,
      color: '#dc2626',
      marginTop: 4,
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: 20,
    },
    button: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '10px 0',
      fontSize: 16,
      fontWeight: 600,
      borderRadius: 9999,
      border: '1.5px solid transparent',
      cursor: 'pointer',
      userSelect: 'none' as const,
      transition: 'background-color 0.2s ease, border-color 0.2s ease',
      backgroundColor: '#e2e8f0',
      color: '#333333',
    },
    buttonHover: {
      backgroundColor: '#cbd5e1',
    },
    deleteButton: {
      backgroundColor: '#dc2626',
      borderColor: '#b91c1c',
      color: 'white',
    },
    deleteButtonHover: {
      backgroundColor: '#b91c1c',
    },
    saveButton: {
      backgroundColor: '#16a34a',
      borderColor: '#15803d',
      color: 'white',
    },
    saveButtonHover: {
      backgroundColor: '#15803d',
    },
    cancelButton: {
      backgroundColor: '#f3f4f6',
      borderColor: '#d1d5db',
      color: '#374151',
    },
    cancelButtonHover: {
      backgroundColor: '#e5e7eb',
    },
  }

  const [editHover, setEditHover] = useState(false)
  const [deleteHover, setDeleteHover] = useState(false)
  const [saveHover, setSaveHover] = useState(false)
  const [cancelHover, setCancelHover] = useState(false)

  return (
    <div ref={cardRef} style={styles.card}>
      <div>
        <div style={styles.header}>
          <IconCat size={28} color="#555555" />
          {spyCat.name}
        </div>
        <div style={styles.breedExperience}>
          {spyCat.breed} — {spyCat.years_of_experience} years experience
        </div>
{spyCat.mission ? (
                <div style={{ marginTop: 24 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: spyCat.mission.is_completed ? '#16a34a' : '#2563eb',
                    }}
                  >
                    Mission #{spyCat.mission.id}{' '}
                    {spyCat.mission.is_completed ? '(Completed)' : '(In Progress)'}
                  </div>

                  {spyCat.mission.targets.length > 0 ? (
                    <ul style={{ marginTop: 12, paddingLeft: 16 }}>
                      {spyCat.mission.targets.map((target) => (
                        <li
                          key={target.id}
                          style={{
                            backgroundColor: target.is_completed ? '#d1fae5' : '#fef3c7',
                            padding: '8px 12px',
                            borderRadius: 12,
                            marginBottom: 8,
                            boxShadow: 'inset 0 0 2px rgba(0,0,0,0.05)',
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>{target.name}</div>
                          <div style={{ fontSize: 13, color: '#555' }}>
                            Country: {target.country}
                          </div>
                          {target.notes && (
                            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                              Notes: {target.notes}
                            </div>
                          )}
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: target.is_completed ? '#065f46' : '#92400e',
                              marginTop: 4,
                            }}
                          >
                            {target.is_completed ? 'Completed' : 'Pending'}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ fontSize: 14, marginTop: 8, color: '#666' }}>
                      No targets assigned
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ fontSize: 14, marginTop: 24, color: '#999' }}>
                  No mission assigned
                </div>
              )}
        {isEditing ? (
          <>
            <div style={{ marginTop: 16 }}>
              <label
                htmlFor="salaryInput"
                style={{ fontWeight: 600, color: '#444444', fontSize: 14 }}
              >
                Salary
              </label>
              <input
                id="salaryInput"
                type="number"
                min={0}
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.currentTarget.value)}
                style={styles.input}
                disabled={loading}
                autoFocus
              />
              
              {error && <p style={styles.error}>{error}</p>}
            </div>
            <div style={styles.buttonGroup}>
              <button
                onClick={handleUpdate}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...styles.saveButton,
                  ...(saveHover ? styles.saveButtonHover : {}),
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={() => setSaveHover(true)}
                onMouseLeave={() => setSaveHover(false)}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setSalaryInput(spyCat.salary.toString())
                  setError(null)
                }}
                disabled={loading}
                style={{
                  ...styles.button,
                  ...styles.cancelButton,
                  ...(cancelHover ? styles.cancelButtonHover : {}),
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={() => setCancelHover(true)}
                onMouseLeave={() => setCancelHover(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={styles.salaryText}>Salary: ${Number(spyCat.salary).toFixed(2)}</div>
            <div style={styles.buttonGroup}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  ...styles.button,
                  backgroundColor: '#e2e8f0',
                  color: '#333',
                  borderColor: '#cbd5e1',
                  ...(editHover ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setEditHover(true)}
                onMouseLeave={() => setEditHover(false)}
              >
                <IconEdit size={24} />
                Edit Salary
              </button>
              <button
                onClick={handleDeleteClick}
                style={{
                  ...styles.button,
                  ...styles.deleteButton,
                  ...(deleteHover ? styles.deleteButtonHover : {}),
                }}
                onMouseEnter={() => setDeleteHover(true)}
                onMouseLeave={() => setDeleteHover(false)}
              >
                <IconTrash size={24} />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
