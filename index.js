// import redux and set up the store with the create store method
const redux = require("redux");
const createStore = redux.createStore;
//import combine reducers to combine mutiple reducers
const combineReducers = redux.combineReducers;

// const BUY_CAKE = "BUY_CAKE";
// const SELL_CAKE = "SELL_CAKE";

//step 1 create actions in action creators
const buyCake = () => {
  return {
    type: "BUY_CAKE",
  };
};

const sellCake = () => {
  return {
    type: "SELL_CAKE",
  };
};

const sellTea = () => {
  return {
    type: "SELL_TEA",
  };
};
const buyTea = () => {
  return {
    type: "BUY_TEA",
  };
};

//step 2 set up the initial state of the store
const initialCakeState = {
  numberOfCakes: 20,
};
const initialTeaState = {
  numberOfTea: 30,
};

//step 3 create the reducer function which will take both the state and actions that will be used to make chnages to the store
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + 1,
      };
    case "SELL_CAKE":
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};

const teaReducer = (state = initialTeaState, action) => {
  switch (action.type) {
    case "BUY_TEA":
      return {
        ...state,
        numberOfTea: state.numberOfTea + 1,
      };
    case "SELL_TEA":
      return {
        ...state,
        numberOfTea: state.numberOfTea - 1,
      };

    default:
      return state;
  }
};

//combine reducers and pass to the store

const rootReducer = combineReducers({
  cake: cakeReducer,
  tea: teaReducer,
});

//step 4 set up store with the create store method that accepts the reducer fxn
//use the create store method that was imported from the redux lib above
const store = createStore(rootReducer);
console.log("initial state:", store.getState());
//subscibe method listens for any changes on the store
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
//the dispatch method is used to send actions to the store throught the reducer.
store.dispatch(buyCake());
store.dispatch(buyTea());
store.dispatch(sellCake());
store.dispatch(sellTea());

//call the unsubscribe method by capturing the retun of the subscribe method
unsubscribe();
