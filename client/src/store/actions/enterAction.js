import { ENTER } from './constant';
import axios from 'axios';

export function enterApps(payload) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      axios({
        method:'post',
        url: `https://kanban-h8-server.herokuapp.com/${payload.enter}`,
        data: payload.data
      })
      .then(response => {
        const data = response.data
        localStorage.setItem('access_token', data.token)
        localStorage.setItem('username', data.username)
        dispatch({
          type: ENTER,
          payload: data
        })
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

export function enterViaGoogle(data) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      axios({
        method: 'post',
        url: 'https://kanban-h8-server.herokuapp.com/googleSign',
        data: {
          id_token: data
        }
      })
      .then(response => {
        const data = response.data
        console.log(data)
        localStorage.setItem('access_token', data.token)
        localStorage.setItem('username', data.username)
        dispatch({
          type: ENTER,
          payload: data
        })
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