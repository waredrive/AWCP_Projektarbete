import React, { Component } from 'react';
import ExternalPagesNavButton from './ExternalPagesNavButton/ExternalPagesNavButton';

class ExternalPagesNavBar extends Component {
  createButtons = (externalPages, homepage) => {
    const navButtons = [];

    if (homepage) {
      navButtons.push(
        <ExternalPagesNavButton
          key={homepage}
          href={homepage}
          title="Visit Homepage"
          icon="fa fa-home fa-lg"
        />
      );
    }

    Object.keys(externalPages).forEach(key => {
      if (!externalPages[key]) {
        return;
      }
      switch (key) {
        case 'facebook_id':
          navButtons.push(
            <ExternalPagesNavButton
              key={key}
              href={`https://www.facebook.com/${externalPages[key]}`}
              title="Visit Facebook"
              icon="fa fa-facebook-f fa-lg"
            />
          );
          break;
        case 'instagram_id':
          navButtons.push(
            <ExternalPagesNavButton
              key={key}
              href={`https://www.instagram.com/${externalPages[key]}`}
              title="Visit Instagram"
              icon="fa fa-instagram fa-lg"
            />
          );
          break;
        case 'twitter_id':
          navButtons.push(
            <ExternalPagesNavButton
              key={key}
              href={`https://twitter.com/${externalPages[key]}`}
              title="Visit Twitter"
              icon="fa fa-twitter fa-lg"
            />
          );
          break;
        default:
          break;
      }
    });
    return navButtons;
  };

  render() {
    const { externalIds, homepage } = this.props;

    if (!externalIds) {
      return null;
    }
    return this.createButtons(externalIds, homepage) || null;
  }
}

export default ExternalPagesNavBar;
