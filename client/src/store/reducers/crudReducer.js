import { GET_ITEM, ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from '../actions/constant';

const initialState = {
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM:
      return {...state, items: action.payload}
    case ADD_ITEM:
      return {...state, items: state.items.concat(action.payload)}
    case EDIT_ITEM:
      let data = {...state}
      let items = data.items
      const updatedItemId = (item) => item.id === action.payload.id
      const itemIndex = items.findIndex(updatedItemId)
      items[itemIndex] = action.payload
      return {...state, items: items}
    case DELETE_ITEM:
      const deletedItemId = (item) => item.id !== action.payload.id;
      return {...state, items: state.items.filter(deletedItemId)}
    default:
      return state
  }
}

export default reducer