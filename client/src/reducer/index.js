const initialState = {
  games: [],
  gamesCopy: [],
  genres: [],
  gameByid: [],
  loaded: true,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GAMES":
      return {
        ...state,
        games: action.payload,
        gamesCopy: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_GAMES_NAME":
      return {
        ...state,
        games: action.payload,
      };
    case "FILTER_BY_GENRE":
      try {
        const allVideogames = state.gamesCopy;
        console.log(action.payload);
        const filtered =
          action.payload === "All"
            ? allVideogames
            : allVideogames.filter((e) => e.generes.includes(action.payload));
        return {
          ...state,
          games: filtered,
        };
      } catch (error) {
        console.log(error);
      }

    //////      FILTER BY RATING

    // case "FILTER_BY_RATING":
    //   let sort = state.games;
    //   if (action.payload !== "-") {
    //     sort =
    //       action.payload === "higher"
    //         ? state.games.sort((a, b) => {
    //             if (a.rating > b.rating) {
    //               return -1;
    //             }
    //             if (b.rating > a.rating) {
    //               return 1;
    //             }
    //             return 0;
    //           })
    //         : state.games.sort((a, b) => {
    //             if (a.rating > b.rating) {
    //               return 1;
    //             }
    //             if (b.rating > a.rating) {
    //               return -1;
    //             }
    //             return 0;
    //           });
    //   }
    //   return {
    //     ...state,
    //     games: sort,

    //   };

    // case "SORT_BY_NAME":
    //   let sort2 = state.games;
    //   if (action.payload !== "-") {
    //     sort2 =
    //       action.payload === "A-Z"
    //         ? state.games.sort((a, b) => {
    //             if (a.name > b.name) {
    //               return 1;
    //             }
    //             if (b.name > a.name) {
    //               return -1;
    //             }
    //             return 0;
    //           })
    //         : state.games.sort((a, b) => {
    //             if (a.name > b.name) {
    //               return -1;
    //             }
    //             if (b.name > a.name) {
    //               return 1;
    //             }
    //             return 0;
    //           });
    //   }
    //   return {
    //     ...state,
    //     games: sort2,

    //   };
    case "FILTER_ORDER":
      const filt = state.games;
      if (action.payload === "Z-A") {
        return {
          ...state,
          games: filt.sort((ant, next) => next.name.localeCompare(ant.name)),
        };
      }
      if (action.payload === "A-Z") {
        return {
          ...state,
          games: filt.sort((ant, next) => ant.name.localeCompare(next.name)),
        };
      }
      if (action.payload === "higher") {
        const x = filt.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          games: x,
        };
      }
      if (action.payload === "lower") {
        return {
          ...state,
          games: filt.sort((a, b) => {
            if (a.rating < b.rating) {
              return -1;
            }
            if (b.rating < a.rating) {
              return 1;
            }
            return 0;
          }),
        };
      }
    case "FILTER_API_DB":
      let all = state.gamesCopy;
      const created =
        action.payload === "db"
          ? all.filter((e) => e.createdInDb)
          : all.filter((e) => !e.createdInDb);
      return {
        ...state,
        games: action.payload === "all" ? state.gamesCopy : created,
      };
    case "GET_GAME_ID":
      return {
        ...state,
        gameByid: action.payload,
      };
    case "LOADED":
      if (state.loaded === true) {
        return {
          ...state,
          loaded: false,
        };
      } else
        return {
          ...state,
          loaded: true,
        };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rootReducer;
