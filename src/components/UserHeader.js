import React from 'react';
import { connect } from 'react-redux';

// it is not necessary sice we used fetchPostAndUder()!!!
// import { fetchUser } from '../actions';

class UserHeader extends React.Component {

    // 3) The third invoked
    // componentDidMount() {

    //     // console.log('componentDidMount')
    //     this.props.fetchUser(this.props.userId)
        
    //}

    //2) The second invoked 
    render() {

        //console.log('render')

        // not effective way
        // console.log(this.props.user)
        // const user = this.props.users
        //    .find(user => user.id === this.props.userId);
        
        
        if(!this.props.user) return null;
        
        return(<div className="header">{ this.props.user.name }</div>);
    }
}

// 1) The first invoked because connect is first invoked adn then mapstateToProps executes.
// MUST KNOW ownProps. It can pull out props of the component, BTW.

// In react component, we can minimize the amount of data to be rendered in the browser
//  by filtering out the unnecessary data before reducer value is going into the react!!!

// If the all data is landing in the react, and it is filtered out in the react
//  the performance issue will be generated.
function mapStateToProps({ users }, ownProps) {
    // fetching the data before the second rendering

    // console.log('mapStateToProps')
    return { user: users.find(user => user.id === ownProps.userId) };
}

// Frist run!!!
export default connect(mapStateToProps)(UserHeader);
