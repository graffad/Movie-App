const initialState = {
  searchValue: '',
  searchType: '',
  searchPage: 1,
  status: '',
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
    case 'SEARCH_ERROR':
      return {
        ...state,
        status: action.payload,
      };
    case 'SEARCH_TOTAL_RESULTS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
