import { afterEach, describe, expect, it, vi } from 'vitest'
import { purgeUserData } from './user.service'

const { getDocsMock, deleteDocMock, collectionMock, docMock } = vi.hoisted(() => ({
  getDocsMock: vi.fn(),
  deleteDocMock: vi.fn().mockResolvedValue(undefined),
  collectionMock: vi.fn((...args: unknown[]) => ({ path: args.slice(1).join('/') })),
  docMock: vi.fn((...args: unknown[]) => ({ path: args.slice(1).join('/') })),
}))

vi.mock('firebase/firestore', () => ({
  collection: collectionMock,
  doc: docMock,
  getDoc: vi.fn(),
  getDocs: getDocsMock,
  setDoc: vi.fn(),
  deleteDoc: deleteDocMock,
  addDoc: vi.fn(),
  Timestamp: { fromDate: vi.fn(), now: vi.fn() },
  serverTimestamp: vi.fn(),
}))

vi.mock('./firebase', () => ({ db: {} }))

const deletedPaths = () => deleteDocMock.mock.calls.map(([ref]) => (ref as { path: string }).path)

describe('purgeUserData', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    getDocsMock.mockReset()
    deleteDocMock.mockReset().mockResolvedValue(undefined)
  })

  it(`
    Given every subcollection has one document for the user
    When purgeUserData runs
    Then each subcollection document and the profile document are deleted
  `, async () => {
    getDocsMock.mockImplementation(async (colRef: { path: string }) => ({
      docs: [{ ref: { path: `${colRef.path}/doc1` } }],
    }))

    await purgeUserData('uid-1')

    const paths = deletedPaths()
    expect(paths).toContain('users/uid-1/relapses/doc1')
    expect(paths).toContain('users/uid-1/etapes/doc1')
    expect(paths).toContain('users/uid-1/combats/doc1')
    expect(paths).toContain('users/uid-1/moodEntries/doc1')
    expect(paths).toContain('users/uid-1/profile/data')
  })

  it(`
    Given a subcollection has no documents
    When purgeUserData runs
    Then it completes without deleting anything for that empty subcollection
  `, async () => {
    getDocsMock.mockResolvedValue({ docs: [] })

    await purgeUserData('uid-2')

    const paths = deletedPaths()
    expect(paths).toEqual(['users/uid-2/profile/data'])
  })
})
