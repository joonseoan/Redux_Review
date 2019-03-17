import React from 'react';
import { connect  } from 'react-redux';

import { fetchPostAndUsers } from '../actions';
import UserHeader from './UserHeader';

// running flow
// 1) Parent Component
// 2) connect() which is directly invoked by the parant component
// 3) render() of child component
// 4) component of child component including action creator
// 5) redux store
// 6) connect() of child component again
// 7) render() again.

class PostList extends React.Component {

    componentDidMount() {
        console.log('componentDidMount')
        this.props.fetchPostAndUsers();
    }

    renderList() {

        return this.props.posts.map(post => {
            return(<div className="item" key={ post.id }>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="description">
                            <h2>{ post.title }</h2>
                            <p>{ post.body }</p>
                        </div>
                        <UserHeader userId={ post.userId } />
                    </div>
                </div>);
        });
        
    }
    
    render() {

        console.log('postList render');
        
        // ############### important.****************************************8
        // We will have two reducer results.
        // The first one is that once the application is loaded into the browser, App "render()" will first,
        //  then it will invoke connect(). Then the render in "this component" will start work.
        //  In a while. reducer will deliver intial default value like {}, null and []
        //  because action creator has not run yes. After the action creator fires in componentDidMount,
        //  where it runs at the second component running, the rudux store (all reducers) will find the value switched,
        //  then deliver that value.
        
        // Therefore, In a while of this initial time, action.type does not have the default value only!!!
        // Then, at the second rendering by "componentDidMount", the action.type will have the value.

        // Therefore, at the initial time, reducer will return the default value of state!!!!!!
        // console.log(this.props.posts)
        return (<div className="ui relaxed divided list">
            { this.renderList() }
        </div>);
    }
}

function mapStateToProps({ posts }) {
    console.log('reducer')
    return { posts };
}

export default connect(mapStateToProps, { fetchPostAndUsers })(PostList);



