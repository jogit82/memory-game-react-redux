const initialState = [
  { id: 0, contents: "Provider", visible: true, matched: true },
  { id: 1, contents: "Provider", visible: true, matched: true },
  { id: 2, contents: "selector", visible: true, matched: true },
  { id: 3, contents: "selector", visible: true, matched: true },
  { id: 4, contents: "useSelector()", visible: true, matched: true },
  { id: 5, contents: "useSelector()", visible: true, matched: true },
  { id: 6, contents: "useDispatch()", visible: true, matched: true },
  { id: 7, contents: "useDispatch()", visible: true, matched: true },
  { id: 8, contents: "Pure Function", visible: true, matched: true },
  { id: 9, contents: "Pure Function", visible: true, matched: true },
  { id: 10, contents: "react-redux", visible: true, matched: true },
  { id: 11, contents: "react-redux", visible: true, matched: true },
];

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "board/setBoard":
      // receives an array of randomized words as payload and return new array of card objects
      let setState = [];
      action.payload.forEach((element, index) =>
        setState.push({
          id: index,
          contents: element,
          visible: false,
          matched: false,
        })
      );
      return setState;
    case "board/flipCard":
      /* contains most of the game play logic:
      receives id of the card to flip over, and set the visible of that card to true
      if two cards are visible, check if their contents are the same, if so, set match=true for both cards
      */
      let flipState = [...state];
      const cardID = action.payload;
      flipState[cardID] = { ...state[cardID], visible: true };

      const [index1, index2] = flipState
        .filter((card) => card.visible)
        .map((card) => card.id);
      if (index2 !== undefined) {
        const card1 = flipState[index1];
        const card2 = flipState[index2];
        if (card1.contents === card2.contents) {
          flipState[index1] = { ...card1, visible: false, matched: true };
          flipState[index2] = { ...card2, visible: false, matched: true };
        }
      }

      return flipState;
    case "board/resetCards":
      // return an array of card objects where the visible property is set to false
      return state.map((card) => ({ ...card, visible: false }));
    default:
      return state;
  }
};

const wordPairs = [
  "Provider",
  "Provider",
  "selector",
  "selector",
  "useSelector()",
  "useSelector()",
  "useDispatch()",
  "useDispatch()",
  "Pure Function",
  "Pure Function",
  "react-redux",
  "react-redux",
];

// keep random logic out of the action creator body:
const randomWords = () => {
  let words = [];
  let newWordPairs = [...wordPairs];
  const reps = newWordPairs.length;
  for (let i = 0; i < reps; i++) {
    const wordIndex = Math.floor(Math.random() * newWordPairs.length);
    words.push(newWordPairs[wordIndex]);
    newWordPairs.splice(wordIndex, 1);
  }

  return words;
};

// action creators
export const setBoard = () => {
  const words = randomWords();
  return {
    type: "board/setBoard",
    payload: words,
  };
};

export const flipCard = (id) => {
  return {
    type: "board/flipCard",
    payload: id,
  };
};

export const resetCards = (indices) => {
  return {
    type: "board/resetCards",
  };
};

// retrieving board: as an array of card objects
// What is Selectors? Selectors are user-defined functions that extract specific pieces of information from a store state value.Selectors are pure functions that take the state as an argument and React components can use selectors to get specific data from the store.By convention selector function names start with select and describe the data they retrieve from the store.
export const selectBoard = (state) =>
  state.board.map((card) => ({ id: card.id, contents: card.contents }));
// wrapping the object in the callback function so it is not mistaken for function body
//({})

export const selectVisibleIDs = (state) =>
  state.board.filter((card) => card.visible).map((card) => card.id);

export const selectMatchedIDs = (state) =>
  state.board.filter((card) => card.matched).map((card) => card.id);
