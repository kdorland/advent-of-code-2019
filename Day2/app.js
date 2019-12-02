// Initialization
const {createStore} = require('redux');
const fs = require('fs');
const lines = fs.readFileSync("input").toString('utf-8');
const array = lines.split(',').map(e => Number(e));
const store = createStore(reducer);

// The reducer function
function reducer(state = 0, action) {
    const p = state.p;
    //console.log("OPCODE", state.data ? state.data[p] : 'program not loaded');
    if (action.type === 'RUN' && state.data[p] === 1) {
        const data = [...state.data];
        data[data[p + 3]] = data[data[p + 1]] + data[data[p + 2]];
        return {...state, data: data, p: p + 4};
    } else
    if (action.type === 'RUN' && state.data[p] === 2) {
        const data = [...state.data];
        data[data[p + 3]] = data[data[p + 1]] * data[data[p + 2]];
        return {...state, data: data, p: p + 4};
    } else
    if (action.type === 'RUN' && state.data[p] === 99) {
        return {...state, running: false};
    } else
    if (action.type === 'REPLACE') {
        const data = [...state.data];
        data[action.index] = action.value;
        return {...state, data: data};
    }
    if (action.type === 'RESET') {
        return {data: action.init, p: 0, running: true};
    }
    else {
        return state
    }
}

// RUN!
function run(noun, verb) {
    store.dispatch({ type: 'RESET', init: [...array] });
    store.dispatch({ type: 'REPLACE', index: 1, value: noun });
    store.dispatch({ type: 'REPLACE', index: 2, value: verb });
    while (store.getState().running) {
        store.dispatch({ type: 'RUN' });
    }
    return store.getState().data[0];
}

console.log("Part 1 solution:", run(12, 2));

for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        const result = run(noun, verb);
        if (result === 19690720) {
            console.log("Noun and verb", noun, verb, "gives result", 19690720);
            console.log("What is 100 * noun + verb?", 100 * noun + verb);
        }
    }
}





