const initialState = {
  data: {
    Search: [],
  },
};
export default function filmsReducer(state = initialState, action) {
  let arrSorted = [];
  let arrNum = [];
  switch (action.type) {
    case 'FIRST_SEARCH':
      return {
        ...state,
        data: action.payload,
      };

    case 'NEXT_SEARCH': {
      if (action.sortBy === 'Title') {
        arrSorted = action.payload.Search
          .sort((prev, next) => {
            if (prev.Title < next.Title) return -1;
            if (prev.Title < next.Title) return 1;
          });
      } else if (action.sortBy === 'yearNewToOld') {
        arrNum = action.payload.Search.map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.Year = parseInt(item.Year, 10);
          return item;
        });
        arrSorted = arrNum.sort((prev, next) => next.Year - prev.Year);
      } else if (action.sortBy === 'yearOldToNew') {
        arrNum = action.payload.Search.map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.Year = parseInt(item.Year, 10);
          return item;
        });
        arrSorted = arrNum.sort((prev, next) => prev.Year - next.Year);
      }
      return {
        ...state,
        data: {
          ...state.data,
          Search: state.data.Search.concat(arrSorted),
        },
      };
    }

    case 'SORT_TITLE': {
      arrSorted = state.data.Search.sort((prev, next) => {
        if (prev.Title < next.Title) return -1;
        if (prev.Title < next.Title) return 1;
      });

      return {
        ...state,
        data: {
          ...state.data,
          Search: arrSorted,
        },
      };
    }

    case 'SORT_TO_OLD': {
      arrNum = state.data.Search.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.Year = parseInt(item.Year, 10);
        return item;
      });
      arrSorted = arrNum.sort((prev, next) => next.Year - prev.Year);

      return {
        ...state,
        data: {
          ...state.data,
          Search: arrSorted,
        },
      };
    }

    case 'SORT_TO_NEW': {
      arrNum = state.data.Search.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.Year = parseInt(item.Year, 10);
        return item;
      });
      arrSorted = arrNum.sort((prev, next) => prev.Year - next.Year);

      return {
        ...state,
        data: {
          ...state.data,
          Search: arrSorted,
        },
      };
    }
    default:
      return state;
  }
}
