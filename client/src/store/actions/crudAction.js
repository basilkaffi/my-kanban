import { GET_ITEM, ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from './constant';
import axios from 'axios';

export function getItem() {
  return dispatch => {
    axios({
      method: 'get',
      url: `https://kanban-h8-server.herokuapp.com/tasks`,
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(response => {
      const data = response.data
      dispatch({
        type: GET_ITEM,
        payload: data
      })
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    })
  }
}