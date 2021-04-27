import React from 'react';
import { Image, Card, Label, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Items extends React.Component {
  render() {
    return (
      <Card centered>
        <Image src={this.props.items.image} size='small' centered />
        <Card.Content>
          <Card.Header>{this.props.items.itemName}</Card.Header>
          <Card.Meta>
            <span>{this.props.items.firstName} {this.props.items.lastName}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.items.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Header>{this.props.items.price}<Button primary floated='right'>Offer</Button> </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Label>
            {this.props.items.label}
          </Label>
        </Card.Content>
        {this.props.currentUser === this.props.items.owner ? (
          <Card.Content extra>
            <Link to={`/edititem/${this.props.items._id}`}>Edit</Link>
          </Card.Content>
        ) : ('')
        }
        <Card.Content extra>
          <Button as={Link} to={`/report/${this.props.items._id}`} icon labelPosition='left' color='red' id='report-button'>
            <Icon name='exclamation triangle' />
            Report Item
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Items.propTypes = {
  items: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
};

const ItemsContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Items);

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ItemsContainer);
