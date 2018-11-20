import React from 'react';
import { TabPane } from 'reactstrap';
import PersonBioList from '../../PersonBioLists/PersonBioList/PersonBioList';

const PersonFactTabPane = props => {
  const { credits, tabId } = props;

  return (
    <TabPane tabId={tabId}>
      {credits.cast.length > 0 || credits.crew.length > 0 ? (
        <>
          <PersonBioList members={credits.cast} headline="As Cast Member" />
          <PersonBioList members={credits.crew} headline="As Crew Member" />
        </>
      ) : (
        <p className="mt-3 ml-1">There is no starring list for this person.</p>
      )}
    </TabPane>
  );
};

export default PersonFactTabPane;
