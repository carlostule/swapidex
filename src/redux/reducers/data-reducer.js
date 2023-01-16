import {
  FETCH_DATA_LOADING,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from '../actions/data-actions'

const initialState = {
  error: undefined,
  data: [],
  loading: false,
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_LOADING:
      return { ...state, loading: true, data: [] }
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case FETCH_DATA_ERROR:
      return { ...state, error: action.error, loading: false, data: [] }
    default:
      return state
  }
}

export default dataReducer
