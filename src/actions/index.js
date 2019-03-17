import _ from 'lodash';
import jsonPlaceHolder from '../api/jsonplaceholder';



export const fetchPostAndUsers = () => async ( dispatch, getState ) => {
        
    // fetchPosts() : return value

    // The following action
    /* 
        async dispatch => {
            const res = await jsonPlaceHolder.get('/posts');
            dispatch ({
                type: 'FETCH_POSTS',
                payload: res.data
            });
        }
    */

    // Normally "redux" takes an single object { type, payload } 
    //  in a parameter to be sent to a reducer.
    // Also, Redux can take in a function as a parameter and invoke the function (the parameter)
    //  like dispatch() inside of the redux. Then the parameter is delivered to reducer.
    //  ## Maybe, redux has a conditoin if(typeof Object) and if(typeof function?) to correctly differentiate tham....
    //  ## Then if it is a function, invoke it  with dispatch() 
    
    // 1) React component invokes with "fetchPostsAndUsers()"
    // 2) Then the function above returns redux-thunk middleware.
    // 3) Redux-Thunk simply waits until any asyn functions are done.
    // 4) Then redux-thunk assigns the return value of asycn function to payload of redux. // that is it in redux thunk.
    // 5) Once it is done, "dispatch" imported as a paramter from redux runs invocation with the function/an object(action) as a parameter
    // 6) If the parameter is a function, it runs another invocation with "dispatch" after redux-thunk controls the async funtion in the same way above.
    // 7) For instance, if the function has promise callback like axios it runs immediately
    // 8) and then again it runs dispatch invokers. Then it delivers the value to reducer.

    /* 
        const fetchPostsAndUsers = () =>{
            // redux-thunk callback
            return async function(dispatch) {

                // Redux
                // invoke dispatch immediately by dispatch invocation
                // await is a "then" here
                await dispatch(fetchUser())
                    // invoked by redux thrunk 
                    // ----------------------------------------------------------------------------------------------------------
                    // Redux-thunk callback          
                    async function(dispatch) {
                        
                        // constrol promise asynch by redux-thunk
                        const res = await jsonPlaceHolder.get('/posts');

                        // Redux
                        // In redux, dispatch invocation employed as a parmeter in this local function
                        dispatch ({
                            type: 'FETCH_POSTS',
                            payload: res.data
                        });
                    } 
                    // --------------------------------------------------------------------------------------------------------
                );
            }
        }
    
    */
    await dispatch(fetchPosts());
    
    // getState() will get all combined reducer.
    // Remember it getState() a call to callback that returns dispatched value to reducer
    // Therefore, getState can get reducer value here.
    /* 
            1) posts: (100) [{…}, {…}, {…}, {…}, {…}, {…}, 
                {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                {…}, {…}, {…}, {…}, {…}, {…}, {…}]......
            2) users: Array(0)
            length: 0
            __proto__: Array(0)
            __proto__: Object
    
    */
    // console.log(getState());
    
    // Therefore, we can use it like this.
    // getState().posts;

    // find userId only
    // _.map(getState().posts, 'userId') // pulling out userId only
    
    // find unique userId
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // console.log(userIds)
    
    // we do not need to place it in async await because the next aciton does not exist.
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // refatoring
    // The result of each chain becomes the first parameter
    _.chain(getState().posts) // argument: the first result or theing to be manipulated
        .map('userId') // only second parmeter because the first parmeter is done in _.chain()
        .uniq() // no need to parameter because the first parmeter is in map()
        .forEach(id => dispatch(fetchUser(id)))
        .value(); // start running this chain!!! must be here.

};


// The resson Redux-Thunk is necessary.

//2) Second issue.
// Without async, it can return null
//  because axios is async!
// Shoud use redux-thunk or saga to correctly recieve api data
//  while we are using axios.

// 1) First issue
// It is not working because of async. In "redux",
//  async function!!!! is not allowed. 

// We can find a reason by using babel where the one below can be pasted.
// In fact, action creator must return a type of a plain object!!!(action).
// However, it does not return "{type: FETCH_POSTS, payload: res}" as specified below.
// Instead, it returns "res" which is not a plain object because the action creator does not support async
// In the pure redux environment, redux is thinking " the first, res" is a return => generates an error.
// It is ruled by Redux

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx
// Because pure redux does not suppot callback!!!!!!!!!!!!!!!!! => No Promise!!!!!!!!! as well.
// export const fetchPosts = async () => {
    
//     const res = await jsonPlaceHolder.get('/posts');
    
//     return {
//         type: 'FETCH_POSTS',
//         payload: res 
//     }
// }

// Different from Redux which allowes a return, an plain bject only,
//  Reduxt-Thunk can either of a function or an object. ******************************8

// When Redux-thunk returns a function
//  the following only is allowed.

// The function itself is invoked by React props,
//  1) if the return is a functio (dispath) => {}, it is heading out to redux-thunk middleware
//      then it runs promise async and then runs dispatch() for redux to deliver type and payload to reducer

//  2) When it is an object it will be directly going to reducers.
    
// Redux-thunk allows async *** because it supports CALLBACK !!!!!!!!!!!!!!!
// It is a main role of the thunk which is a returned function from action creator. 

// export const fetchPosts = () => {
    // remember getState is a method in recuder ****************
    //  to get data when action creator makes a change of redux store
    // getState is normally null in action.
//     return async function(dispatch, getState) {
//         const res =  await jsonPlaceHolder.get('/posts');
//         return {
//                 type: 'FETCH_POSTS',
//                 payload: res 
//         };
//     };
// };

// Final refactoring
export const fetchPosts = () => async dispatch => {
    const res = await jsonPlaceHolder.get('/posts');
    dispatch ({
        type: 'FETCH_POSTS',
        payload: res.data
    });
};

// [ Fetch User ]
// 2) when using conbined redux-thunk action creator only
export const fetchUser = id => async dispatch => { 
    const res = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: res.data
    });
};

// 1)
// fetch a single user at a time.
// export const fetchUser = (id) => async dispatch => {

//     // in jsonPlaceHolder, we can use "params" to fetch a part of all data.
//     // In this case, wild-card is an ID of the user.
//     const res = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({
//         type: 'FETCH_USER',
//         payload: res.data
//     });
// }

// 2)
// To use the momoize, we must refactor as shown below. 

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const res = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({
//         type: 'FETCH_USER',
//         payload: res.data
//     });
// });

// runs _fetchUser(id, dispatch)
// It is possible to put two arguments,
//  and "even with a change in one of them", 
//  it will work again.
// The first arrow means return
// THE second arrow means running!!!! Arrow can also run!!! if it does not have variable decalaration.
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch); 

// ******************************** [ Memoize ] ************************8
/* 
const getUser = function(id) {
	fetch(id);
	return 'Made a request';
}

const momoizeGetUser = _.memoize(getUser);

memoizeGetUser(1) // working...
memoizeGetUSER(1) // NOT WORKING!!!!!!!!!!!!!!!!!!!!!111
memoizeGetUSER(2) // working...

In memoize, if the argument is same,
it does not work until the memoize gets new argument.

Therefore, if we need to put the same argumetn more than serveral times,
and all result value are same, 
we can use memoize.

*/
//****************************************************************8**** */