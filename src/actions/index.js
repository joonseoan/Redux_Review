import _ from 'lodash';
import jsonPlaceHolder from '../api/jsonplaceholder';

export const fetchPostAndUsers = () => {
    return async ( dispatch, getState ) => {
        
        // fetchPosts() : return value

        // The following function
        /* 
            await dispatch(
                async dispatch => {
                    const res = await jsonPlaceHolder.get('/posts');
                    dispatch ({
                        type: 'FETCH_POSTS',
                        payload: res.data
                  });
                }
            )
        
        */
        // Normally redux thunk dispatch object { type, payload } to reducer.
        // Also, Redux thunk can take a function and invoke it.
        // Therefore, the function, a return value of "fetchPosts()",
        //  can be invoked inside of redux-thunk
        //  and then dispatch its return value to reuder!!!! 
        await dispatch(fetchPosts());
        
        // getState() will get all combined reducer.
        /* 
                posts: (100) [{…}, {…}, {…}, {…}, {…}, {…}, 
                    {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                    {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                    {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                    {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, 
                    {…}, {…}, {…}, {…}, {…}, {…}, {…}]......
                users: Array(0)
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
        
        // we do not need to change it asyn because the next aciton does not exist.
        // userIds.forEach(id => dispatch(fetchUser(id)));

        // refatoring
        _.chain(getState().posts) // argument: the first result or theing to be manipulated
            .map('userId') // only second parmeter because the first parmeter is done in _.chain()
            .uniq() // no need to parameter because the first parmeter is in map()
            .forEach(id => dispatch(fetchUser(id)))
            .value(); // start running this chain!!! must be here.

    };
}

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
export const fetchPosts = () => {
    return async dispatch => {
        const res = await jsonPlaceHolder.get('/posts');
        dispatch ({
            type: 'FETCH_POSTS',
            payload: res.data
        });
    };
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
// To use the momize, we must refactor the
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const res = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch({
//         type: 'FETCH_USER',
//         payload: res.data
//     });

// });

// // return _fetchUser(id, dispatch)
// // It is possible to put two arguments,
// //  and even with a change in one of them, 
// //  it will work again.
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch); 


export const fetchUser = id => async dispatch => { 
    const res = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: res.data
    });
};

// ******************************** momoize ************************8
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