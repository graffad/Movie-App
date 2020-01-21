export function firstSearchAction(data) {
  return {
    type: 'FIRST_SEARCH',
    payload: data,
  };
}

export function nextSearchAction(data, sort) {
  return {
    type: 'NEXT_SEARCH',
    payload: data,
    sortBy: sort,
  };
}

export function searchValAction(value) {
  return {
    type: 'SEARCH_VALUE',
    payload: value,
  };
}
export function searchTypeAction(value) {
  return {
    type: 'SEARCH_TYPE',
    payload: value,
  };
}

// export function filmInfoAction(data) {
//   return {
//     type: 'FILM_INFO',
//     payload: data,
//   };
// }

export function sortTitleAction() {
  return {
    type: 'SORT_TITLE',
  };
}
export function sortToOldAction() {
  return {
    type: 'SORT_TO_OLD',
  };
}
export function sortToNewAction() {
  return {
    type: 'SORT_TO_NEW',
  };
}

export function searchError(value) {
  return {
    type: 'SEARCH_ERROR',
    payload: value,
  };
}
export function searchTotalResults(value) {
  return {
    type: 'SEARCH_TOTAL_RESULTS',
    payload: value,
  };
}
