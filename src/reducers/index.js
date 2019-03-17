// Bear in mind,
// Reducers are always seeing Action Creator and Action.
// Then, every time action is delivered through dispatch,
//  it changes state value if the condition(type) defined in action
//   is identified with the condition(type) in reducers.

import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';

export default combineReducers({

    posts: postReducer,
    users: userReducer

});

/* 

    [ rule of reducers ]
    // 1) A reducer must return a value. "Undefined" will generate an error. ******************8
    // However, "null" including {}, [], and null does not cause an error.
    // Please, remember that the initial value is "undefined" without setting up the default value above.
    // For this reason, when we build a reducer, default value in paramter or anywhere in the function
    //  should be specified.

    // 2) Each reducer has two arguments: state and action value(object) through dispatch.
        
        function(state = [], action) {
        }
        
        STATE is at the first time call is always "undefined"
        However, the reducer does not allow any “undefined” value return to combineReducers 
        and eventually APP components as mentioned above.
        Therfore we need to define the initial default value 
        as shown up and above.

        The second time the reducer is invoked,
        the first parameter MUST not be null.
        It must a value defined in the first call of action creator. 
        It is because the reducer delivers the value the redux store 
        and then the store records the value.

    // 3) Reducer never reaches out to the role of action creator
    //    such as api request.
    //  In other wrods, the reducer never gets:
        
        return document.querySelector('input') (bad)
        return axios.get('/posts) (bad)

        return state + action (good!)

        only state and action can be manipulated in the reducers!*************************88

    //4) Never mutate "state" value of array and object.. =========== But it not true.
    // It is only for beginner to easily understand the reducers!
    // No mutation of state is a sort of convention or recommendation, by the way.
    //  visit at github.com/reduxjs/redux
    // The reason is because previous state is stored redux and the next state value can accidently sames as previous value.
    // like the one below. ***************************************************************

        function (state, action) {
            // strongly recommend not to mutate the state value as shown below if the state.
            // it returns the same state even though the content valcue of object and array was changed.
            // It is because in javascript, array an and object are stored as referece..,not content value.
            // That means tate redux will not update props in React!!!!!!!!!!!!!!!!!!!!!!!

            state[0] = "sam"
            state.push("james")
            state.pop()

            state.name = 'SAMS"
            state.age =30

            // still same state of the previous state!!!!
            return state
        }
        ******************************************************************************************

        // It would be ok to change the string or number value


        [mutation]

        const nums = [1, 2, 3]
        nums === nums (true)
        
        // because javascript engines just compares the memory reference
        //      No way to compare the contents inside of the array.
        // In this case, [ 1, 2, 3 ] is assigned to the different memory reference.
        //  that means that they are different.!!!!
        nums === [1, 2, 3] (false) 


*/