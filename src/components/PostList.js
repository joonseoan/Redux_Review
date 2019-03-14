import React from 'react';
import { connect  } from 'react-redux';

import { fetchPosts } from '../actions';
import UserHeader from './UserHeader';

class PostList extends React.Component {

    componentDidMount() {
        this.props.fetchPosts();
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
        // ############### important.****************************************8
        // We will have two reducers.
        // Once the application is loaded into the browser by "render()",
        //  all reducers run in one initial time. In this time the reducer is still in ready
        //  to get action.type because react render runs ahead of the all reducers.
        // Please, remember that redux thunk return the action by async callback!!!
        // Therefore, render is faster than callback returns value!!!!!!!!

        //  Therefore, In a while of this initial time, action.type does not have value!!!
        // Then, at the second rendering by "componentDidMount", the action.type will have the value.

        // Therefore, at the initial time, reducer will return the default value of state!!!!!!
        console.log(this.props.posts)
        return (<div className="ui relaxed divided list">
            { this.renderList() }
        </div>);
    }
}

function mapStateToProps({ posts }) {
    return { posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostList);



