export const FETCH_DATA_LOADING = 'FETCH_DATA_LOADING'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR'

const fetchDataLoading = () => ({
  type: FETCH_DATA_LOADING
})

const fetchDataSuccess = (payload) => ({
  type: FETCH_DATA_SUCCESS,
  payload,
})

const fetchDataError = (error) => ({
  type: FETCH_DATA_ERROR,
  error,
})

export const fetchData = ({category = 'people', page = 1}) => async (dispatch) => {
  try {
    dispatch(fetchDataLoading())
    const response = await fetch(`https://swapi.dev/api/${category}/?page=${page}`)
    const responseJson = await response.json()
    dispatch(fetchDataSuccess(responseJson ?? []))
  } catch (error) {
    dispatch(fetchDataError(error))
  }
}
