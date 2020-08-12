import { GET_ITEM, ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from './constant';
import axios from 'axios';
import Swal from 'sweetalert2';

const loading = () => {
    Swal.fire({
      html: '<div class="loading"></div>',
      showConfirmButton: false,
      padding: '0px'
    })
}

export function getItem() {
  return dispatch => {
    loading()
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
      Swal.close()
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

export function addItem(payload) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      loading()
      axios({
        method: 'post',
        url: `https://kanban-h8-server.herokuapp.com/tasks`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
      .then(response => {
        const { data } = response
        const item = {
          id: data.id,
          title: data.title,
          category: data.category,
          createdAt: data.createdAt,
          User: {
              name: localStorage.username
          }
        }
        console.log(item, "resolve axios")
        dispatch({
          type: ADD_ITEM,
          payload: item
        })
        Swal.close()
        resolve()
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
    })
  }
}

export function editItem(payload) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      loading()
      axios({
        method:'PUT',
        url:`https://kanban-h8-server.herokuapp.com/tasks/${payload.id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
          title: payload.title,
          category: payload.category
        }
      })
      .then(response => {
        dispatch({
          type: EDIT_ITEM,
          payload: {
            id: payload.id,
            title: payload.title,
            category: payload.category
          }
        })
        Swal.close()
        resolve()
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
    })
  }
}

export function deleteItem(payload) {
  return dispatch => {
    loading()
    axios({
        method:'DELETE',
        url:`https://kanban-h8-server.herokuapp.com/tasks/${payload}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .then(response => {
      dispatch({
        type: DELETE_ITEM,
        payload: {
          id: payload
        }
      })
      Swal.close()
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