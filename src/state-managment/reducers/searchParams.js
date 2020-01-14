const initialState = {
  searchValue: '',
  searchType: '',
  searchPage: 1,
};
export default function searchParams(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload,
      };
    case 'SEARCH_TYPE':
      return {
        ...state,
        searchType: action.payload,
      };
    case 'SEARCH_PAGE':
      return {
        ...state,
        searchPage: action.payload,
      };
    default:
      return state;
  }
}
