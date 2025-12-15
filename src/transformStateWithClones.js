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

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, prevState, action.extraData);
        stateHistoryPush(nextState);

        break;

      case 'removeProperties':
        Object.assign(nextState, prevState);

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        stateHistoryPush(nextState);

        break;

      case 'clear':
        stateHistoryPush(nextState);

        break;

      default:
        break;
    }
  }

  return stateHistory;

  function stateHistoryPush(nextState) {
    stateHistory.push(nextState);
    prevState = nextState;
  }
}

module.exports = transformStateWithClones;
