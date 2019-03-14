import jsonPlaceHolder from '../api/jsonplaceholder';

// The resson Redux-Thunk is necessary.

//2) Second issue.
// Without async, it can return null
//  because axios is async!
// Shoud use redux-thunk or saga to correctly recieve api data
//  while we are using axios.

// 1) First issue
// It is not working because of async. In "redux",
//  async function!!!! is not allowed. 

// We can find reson by using babel where the one below can be pasted.
// In fact, action creator must retur a type of a plain object!!!(action).
// Hoever, it does not return "{type: FETCH_POSTS, payload: res}" as specified below.
// But it returns "res" which is not a plain object because the action creator does not support async
// In the pure redux environment, redux is thinking " the first, res" is a return => generates an error.
// It is ruled by Redux

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx
// Because pure redux deos suppot callback!!!!!!!!!!!!!!!!! => No Promise!!!!!!!!!1
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

// When it returns a function, that function is invoked by React props,
//  then the return value will be going to reducers

// When it is an object it will be directly going to reducers.
    
// In this case, we manually call dispatch 
//  to deal with and then invoke the "functional return"
//, not an object return

// Redux -thunk allows async *** because it supports CALLBACK !!!!!!!!!!!!!!!
//  which is a returned function from action creator. That returned callback function
//  is invokced manually by React and then the return of the callback function itself
//  is returned to Reducers.

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
    const res =  await jsonPlaceHolder.get('/posts');
    dispatch ({
        type: 'FETCH_POSTS',
        payload: res.data
    });
};

// fetch a single user at a time.
export const fetchUser = (id) => async dispatch => {
    // in jsonPlaceHolder, we can use "params" to fetch a part of all data.
    // In this case, wild-card is an ID of the user.
    const res = await jsonPlaceHolder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: res.data
    });
}
