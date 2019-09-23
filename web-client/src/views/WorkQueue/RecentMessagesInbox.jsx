import { CaseLink } from '../../ustc-ui/CaseLink/CaseLink';
import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';

export const RecentMessagesInbox = connect(
  {
    documentHelper: state.documentHelper,
    formattedWorkQueue: state.formattedWorkQueue,
    workQueueHelper: state.workQueueHelper,
  },
  ({ documentHelper, formattedWorkQueue, workQueueHelper }) => {
    return (
      <React.Fragment>
        <table
          aria-describedby="recent-messages-tab"
          className="usa-table work-queue subsection"
          id="my-recent-messages"
        >
          <thead>
            <tr>
              <th aria-label="Docket Number" colSpan="2" className="small">
                <span className="padding-left-2px">Docket</span>
              </th>
              <th className="small">Filed</th>
              <th>Case name</th>
              <th>Document</th>
            </tr>
          </thead>
          {formattedWorkQueue.slice(0, 5).map((item, idx) => {
            {
              console.log(item);
            }
            return (
              <tbody key={idx}>
                <tr>
                  <td aria-hidden="true" className="focus-toggle" />
                  <td className="message-queue-row small">
                    <CaseLink formattedCase={item} />
                  </td>
                  <td className="message-queue-row small">
                    <span className="no-wrap">{item.received}</span>
                  </td>
                  <td className="message-queue-row">
                    <span>{item.caseTitle}</span>
                  </td>
                  <td className="message-queue-row message-queue-document">
                    <div className="message-document-title">
                      <a
                        className={
                          item.isRead ? 'case-link' : 'link case-link-bold'
                        }
                        href={documentHelper({
                          docketNumber: item.docketNumber,
                          documentId: item.document.documentId,
                          messageId: item.currentMessage.messageId,
                          workItemIdToMarkAsRead: !item.isRead
                            ? item.workItemId
                            : null,
                        })}
                        onClick={e => {
                          e.stopPropagation();
                        }}
                      >
                        {item.document.documentTitle ||
                          item.document.documentType}
                      </a>
                    </div>
                    {workQueueHelper.showMessageContent && (
                      <div
                        className="message-document-detail"
                        id={`detail-${item.workItemId}`}
                      >
                        {item.currentMessage.message}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </React.Fragment>
    );
  },
);
