import React from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions';

class UserHeader extends React.Component {

    componentDidMount() {
        this.props.fetchUser(this.props.userId)
        
    }

    render() {

        // not effective way
        console.log(this.props.user)
        // const user = this.props.users
        //    .find(user => user.id === this.props.userId);
        
        
        if(!this.props.user) return null;
        
        return(<div className="header">{ this.props.user.name }</div>);
    }
}
// MUST KNOW ownProps. It can pull out props of the component
// We can minimize the amount of data to be rendered in the browser
//  by using "ownProps"
// Then we can render the data in the component above.
function mapStateToProps({ users }, ownProps) {
    return { user: users.find(user => user.id === ownProps.userId) };
}

export default connect(mapStateToProps, { fetchUser })(UserHeader);
