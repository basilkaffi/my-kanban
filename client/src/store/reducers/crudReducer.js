import {
  GET_ITEM,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
} from "../actions/constant";
import io from "socket.io-client";
const socket = io.connect('https://kanban-h8-server.herokuapp.com')

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM:
      const getItems= { ...state, items: action.payload };
      socket.emit('updateChange', getItems)
      return getItems
    case ADD_ITEM:
      const addItems= { ...state, items: state.items.concat(action.payload) };
      socket.emit('updateChange', addItems)
      return addItems
    case EDIT_ITEM:
      let data = { ...state };
      let tasks = data.items;
      const updatedItemId = (item) => item.id === action.payload.id;
      const unUpdatedItemId = (item) => item.id !== action.payload.id;
      const itemIndex = tasks.findIndex(updatedItemId);
      tasks[itemIndex].title = action.payload.title;
      tasks[itemIndex].category = action.payload.category;
      const editItems= {
        ...state,
        items: state.items.filter(unUpdatedItemId).concat(tasks[itemIndex]),
      };
      socket.emit('updateChange', editItems)
      return editItems
    case DELETE_ITEM:
      const deletedItemId = (item) => item.id !== action.payload.id;
      const deleteItems= { ...state, items: state.items.filter(deletedItemId) };
      socket.emit('updateChange', deleteItems)
      return deleteItems
    default:
      return state;
  }
};

export default reducer;
