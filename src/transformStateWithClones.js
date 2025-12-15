'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = {};
  const stateHistory = [];

  Object.assign(prevState, state);

  for (const action of actions) {
    const nextState = {};

    if (action.type === 'addProperties') {
      Object.assign(nextState, prevState, action.extraData);

      stateHistory.push(nextState);

      prevState = nextState;
    } else if (action.type === 'removeProperties') {
      Object.assign(nextState, prevState);

      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
      stateHistory.push(nextState);
      prevState = nextState;
    } else if (action.type === 'clear') {
      stateHistory.push(nextState);
      prevState = nextState;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
