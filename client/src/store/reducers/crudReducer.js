import {
  GET_ITEM,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
} from "../actions/constant";

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM:
      return { ...state, items: action.payload };
    case ADD_ITEM:
      return { ...state, items: state.items.concat(action.payload) };
    case EDIT_ITEM:
      let data = { ...state };
      let tasks = data.items;
      const updatedItemId = (item) => item.id === action.payload.id;
      const unUpdatedItemId = (item) => item.id !== action.payload.id;
      const itemIndex = tasks.findIndex(updatedItemId);
      tasks[itemIndex].title = action.payload.title;
      tasks[itemIndex].category = action.payload.category;
      return {
        ...state,
        items: state.items.filter(unUpdatedItemId).concat(tasks[itemIndex]),
      };
    case DELETE_ITEM:
      const deletedItemId = (item) => item.id !== action.payload.id;
      return { ...state, items: state.items.filter(deletedItemId) };
    default:
      return state;
  }
};

export default reducer;
