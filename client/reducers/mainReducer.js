import * as types from '../constants/actionTypes';

// userSessions:[{session: {1 session}, mainuser:{}, partner:{}},...]
const initialState = {
  currentUser: {
    _id: 5,
    username: 'usertest',
    sessioncount: 10,
  },
  currentPartner: {
    _id: 4,
    partnername: 'partnertest1',
    sessioncount: 2,
  },
  // currentUser: {},
  // currentPartner: {},
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
  // Verify User
    case types.VERIFY_USER:
      console.log('action.payload', action.payload);
      const user = {
        id: null,
        username: null,
        sessioncount: null,
      };

      // {body: {username: action.payload.username, password: action.payload.password}}

      fetch(`http://localhost:8080/api/user/?username=${action.payload.username}&password=${action.payload.password}`)
        .then((response) => response.json()).then((data) => {
        // console.log('data:', data)
          user.id = data._id;
          user.username = data.username;
          user.sessioncount = data.sessioncount;
          console.log('User: ', user);
          // console.log('state after login: ', {
          //   ...state,
          //   currentUser: {
          //     ...state.currentUser,
          //     _id: user.id,
          //     username: user.username,
          //     sessioncount: user.sessioncount
          //   }
          // })
          return {
            ...state,
            currentUser: {
              ...state.currentUser,
              _id: user.id,
              username: user.username,
              sessioncount: user.sessioncount,
            },
          };
        })
        .catch((err) => console.log(err));

      // Add User

      // LevelLanguage

      // Find Partner
      // eslint-disable-next-line no-fallthrough
    case types.FIND_PARTNER:
      console.log('state before find partner', { ...state });
      let partner;

      // fetch request to get a partner
      fetch('http://localhost:8080/api/partner/?language=Javascript&skill=Easy&_id=5') // fetch('/api/partner' + '/' + 'Javascript' + '&' + 'skill'
        .then((response) => response.json())
        .then((data) => {
          partner = data;
          console.log('state after find partner', { ...state, currentPartner: partner });
        })
        .catch((err) => console.log(err));

      // return updated state
      return {
        ...state,
        currentPartner: partner,
      };

    case types.DUMMY:

      console.log('DUMMY STATE', state);

      // Increment Session

      // Pair Again

    default:
      return state;
  }
};

export default mainReducer;
