import { ENTER } from '../actions/constant';

const initialState = {
  token: "",
  username: ""
}

const reducer = (state = initialState, action) => {
  switch (action.types) {
    case ENTER:
      const payload = action.payload
      return {...state, token: payload.token, username: payload.username}
    default:
      return state
  }
}

export default reducer