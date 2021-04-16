import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Container, Loader, Segment, Grid, Image, Divider, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';

class ProfilePage extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // If subs are loaded then render page
  renderPage() {
    // console.log(this.props.profile);
    return (
      <Container>
        <Segment>
          <Header as='h1' textAlign="center">Profile Page</Header>
          <Grid columns={2}>
            <Grid.Column width={6}>
              <Link to={`/edit/${this.props.profile._id}`}><Icon name='pencil alternate'/>Edit</Link>
              <Image src={this.props.profile.picture}/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' textAlign='left'>{this.props.profile.firstName} {this.props.profile.lastName}</Header>
              <p><Icon name='user'/>Username: {this.props.profile.username}</p>
              <Divider horizontal>Information</Divider>
              <p><Icon name='mail'/>Email: {this.props.profile.email}</p>
              <p><Icon name='address card'/>Bio: {this.props.profile.bio}</p>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

// Ready proptype for Profiles pages
ProfilePage.propTypes = {
  profile: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Metoer data to React Component
export default withTracker(() => {
  // Populate mini mongo with collection before render()
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  // check if subs ready
  const ready = sub.ready();
  // Get the profile documents
  const profile = Profiles.collection.find().fetch()[0];
  // If subsciption went through successfully we can return ready
  return {
    profile,
    ready,
  };
})(ProfilePage);