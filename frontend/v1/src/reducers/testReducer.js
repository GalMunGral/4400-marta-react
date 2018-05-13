export default function testState(state = { val: 0 }, action) {
  switch(action.type) {
    case "TEST": {
      return { val: action.value };
    }
    default: {
      return state;
    }
  }
}