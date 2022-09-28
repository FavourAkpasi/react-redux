// import redux and set up the store with the create store method
const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";

//step 1 create actions in action creators
const buyCake = () => {
  return {
    type: BUY_CAKE,
  };
};

//step 2 set up the initial state of the store
const initialState = {
  numberOfCakes: 20,
};

//step 3 create the reducer function which will take both the state and actions that will be used to make chnages to the store
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};

//step 4 set up store with the create store method that accepts the reducer fxn
//use the create store method that was imported from the redux lib above
const store = createStore(reducer);
console.log(store.getState());
//subscibe method listens for any changes on the store
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
//the dispatch method is used to send actions to the store throught the reducer.
store.dispatch(buyCake());
//call the unsubscribe method by capturing the retun of the subscribe method
unsubscribe();
