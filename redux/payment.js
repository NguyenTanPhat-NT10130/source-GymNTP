const initialState = {
  // customer: null,
  // employee: null,
  monthlySubscription: null,
  sessionSubscription: null,
  trainer: null
};

const addSelectedItem = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_ITEM_FOR_PAYMENT':
      return {
        ...state,
        [action.payload.itemType]: action.payload.item
      };
    default:
      return state;
  }
};
