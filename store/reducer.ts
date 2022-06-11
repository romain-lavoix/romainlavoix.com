import { ActionType, GlobalStateInterface } from './types'
import { initialState } from './index'

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        isSideBarOpen: true,
      }
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        isSideBarOpen: false,
      }
    case 'SET_PERSISTENCE':
      return {
        ...state,
        persistenceType: action.payload,
      }
    case 'SELECT_ROUTE':
      return {
        ...state,
        selectedRoute: action.payload,
      }
    case 'PURGE_STATE':
      return initialState
    default:
      return state
  }
}

export default Reducer
