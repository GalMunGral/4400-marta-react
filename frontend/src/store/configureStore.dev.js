import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import DevTools from '../containers/DevTools';

const state = {
  currentUser: {
    username: '',
    isLoggedIn: false,
    userType: null
  },
  stations: {
    isLoading: false,
    data: []
  },
  admin: {
    stations: {
      selected: 0,
      isFresh: false,
      order: {
        attr: "Name",
        asc: true
      },
    },
    suspendedCards: {
      isLoading: false,
      isFresh: false,
      selected: 0,
      order: {
        attr: 'BreezecardNum',
        asc: true
      },
      data: []
    },
    breezeCards: {
      isLoading: false,
      selected: 0,
      isFresh: false,
      order: {
        attr: 'BreezecardNum',
        asc: true
      },
      filter: {
        owner: null,
        cardNumber: null,
        minValue: null,
        maxValue: null,
        showSuspended: false
      },
      data: []
    },
    flowReport: {
      isLoading: false,
      isFresh: false,
      selected: 0,
      order: {
        attr: 'Name',
        asc: true
      },
      filter: {
        startTime: null,
        endTime: null
      },
      data: []
    }
  },
  passenger: {
    cards: {
      isLoading: false,
      isFresh: false,
      selected: 0,
      order: {
        attr: 'BreezecardNum',
        asc: true
      },
      data: []
    },
    currentTrip: {
      startTime: null,
      currentFare: null,
      startStationIndex: null,
      endStationIndex: null
    },
    tripHistory: {
      isLoading: false,
      isFresh: false,
      selected: 0,
      order: {
        attr: 'Time',
        asc: true
      },
      filter: {
        start: "",
        end: ""
      },
      data: []
    }
  },
  error: {
    unread: false,
    level: 0,
    message: ""
  }
};

export function configureStore(initialState) {
  return createStore(
    rootReducer,
    state,
    compose(
      applyMiddleware(thunk),
      // DevTools.instrument()
    )
  );
}
