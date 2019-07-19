import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { props, sequences, state } from 'cerebral';
import React from 'react';

export const ViewAllDocumentsMobile = connect(
  {
    chooseModalWizardStepSequence: sequences.chooseModalWizardStepSequence,
    overlayRef: props.overlayRef,
    updateModalValueSequence: sequences.updateModalValueSequence,
    viewAllDocumentsHelper: state.viewAllDocumentsHelper,
  },
  ({
    chooseModalWizardStepSequence,
    overlayRef,
    updateModalValueSequence,
    viewAllDocumentsHelper,
  }) => {
    if (overlayRef && overlayRef.current) {
      overlayRef.current.scrollTo(0, 0);
    }
    return (
      <React.Fragment>
        <div className="overlay-blue-header">
          <div className="grid-container">
            <button
              aria-roledescription="button to return to What is this document for?"
              className="heading-3 usa-button usa-button--unstyled"
              onClick={() =>
                chooseModalWizardStepSequence({
                  value: 'WhatDocumentIsThis',
                })
              }
            >
              <FontAwesomeIcon icon="caret-left" />
              What is this document for?
            </button>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-row">
            <div className="grid-col-12">
              <h1 className="margin-bottom-105" tabIndex="-1">
                All Document Categories
              </h1>
              <h2 className="margin-bottom-3" tabIndex="-1">
                Select Document Category
              </h2>
            </div>
          </div>
        </div>
        <div className="margin-bottom-2">
          {viewAllDocumentsHelper.sections.map((title, index) => {
            return (
              <div
                className="category-view grid-container padding-bottom-1 padding-top-1"
                key={`${title}-document-${index}`}
              >
                <button
                  className="usa-button usa-button--unstyled "
                  onClick={() => {
                    updateModalValueSequence({
                      key: 'category',
                      value: title,
                    });
                    updateModalValueSequence({
                      key: 'from',
                      value: 'ViewAllDocuments',
                    });
                    updateModalValueSequence({
                      key: 'fromLabel',
                      value: 'All Document Categories',
                    });
                    chooseModalWizardStepSequence({
                      value: 'ViewDocumentCategory',
                    });
                  }}
                >
                  {title}
                </button>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  },
);
