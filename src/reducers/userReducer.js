export default (state=[], action) => {
    switch(action.type) {
        case 'FETCH_USER':
            // The way of chaning the "array" sate value
            return [ ...state, action.payload ];
        default:
            return state;
    }
};