import React from 'react';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import ExternalPagesNavBar from '../../../shared/ExternalPagesNavBar/ExternalPagesNavBar';

const PersonHeader = props => {
  const { imagePath, name, biography, homepage, externalIds } = props;

  return (
    <Backdrop>
      <div className="container text-light">
        <div className="row">
          <div className="col-4 mt-4 d-flex ">
            <img
              className="rounded align-self-center"
              style={{ width: '90%' }}
              src={imagePath}
              title={name}
              alt={`${name}`}
            />
          </div>
          <div className="col-8 my-3">
            <h1 className="mb-4">{name}</h1>
            <ExternalPagesNavBar
              homepage={homepage}
              externalIds={externalIds}
            />
            <div>
              <h4 className="mt-4">Biography</h4>
              <p className="text-justify">
                {biography || `There is no biography for ${name}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default PersonHeader;
