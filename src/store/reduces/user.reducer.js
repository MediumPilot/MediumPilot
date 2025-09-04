const initialState = {
  user: null,
  checkingAuth: true,
};

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user, checkingAuth: false };
    case 'CLEAR_USER':
      return { ...state, user: null, checkingAuth: false };
    case 'SET_CHECKING_AUTH':
      return { ...state, checkingAuth: action.value };
    default:
      return state;
  }
}
