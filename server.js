// use axios to fetch data from an api endpoint using async actions.
//first create the actions state reducer and store

//set up store
const redux = require("redux");
const createStore = redux.createStore;
//get apply middleware to use the redux thunk middleware then pass it to the create store
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
// get axios to fetch data with async action creators
const axios = require("axios");

//1 define initial state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//2 define actions inside action creators
const fetchUsersRequest = () => {
  return {
    type: "FETCH_USERS_REQUEST",
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: "FETCH_USERS_SUCCESS",
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: "FETCH_USERS_FAILURE",
    payload: error,
  };
};

//3 define reducer function that takes the initial state and actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//set up async actions
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.name);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.messgae));
      });
  };
};

//4 create the redux store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
console.log("initial state:", store.getState());
store.subscribe(() => {
  console.log("new state", store.getState());
});
store.dispatch(fetchUsers());
