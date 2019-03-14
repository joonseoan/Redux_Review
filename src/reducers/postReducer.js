// Do not allow the reducer returns "undefined"
export default (state = [], action) => {
    
    // It is ok.
    // if(action.type === 'FETCH_POSTS') {
    //     return action.payload;
    // }
    
    // return state;

    switch (action.type) {
        // the other case can be logically added 
        //      from the other action creator.
        //      if they are related each other.
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;
    }
}