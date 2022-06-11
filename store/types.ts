import { Dispatch } from 'react'

export interface GlobalStateInterface {
  isSideBarOpen: boolean
  selectedRoute: string
  persistenceType: string
}

export type ActionType = {
  type: string
  payload?: any
}

export type ContextType = {
  globalState: GlobalStateInterface
  dispatch: Dispatch<ActionType>
}
