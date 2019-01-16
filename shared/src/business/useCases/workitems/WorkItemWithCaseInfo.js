const {
  joiValidationDecorator,
} = require('../../../utilities/JoiValidationDecorator');
const joi = require('joi-browser');

const uuidVersions = {
  version: ['uuidv4'],
};
const uuid = require('uuid');
const Message = require('../../entities/Message');

/**
 * constructor
 * @param rawWorkItem
 * @constructor
 */
function WorkItemWithCaseInfo(rawWorkItem) {
  Object.assign(this, rawWorkItem, {
    workItemId: rawWorkItem.workItemId || uuid.v4(),
    createdAt: rawWorkItem.createdAt || new Date().toISOString(),
    updatedAt: rawWorkItem.updatedAt || new Date().toISOString(),
  });

  this.messages = (this.messages || []).map(message => new Message(message));
}

joiValidationDecorator(
  WorkItemWithCaseInfo,
  joi.object().keys({
    workItemId: joi
      .string()
      .uuid(uuidVersions)
      .required(),
    messages: joi
      .array()
      .items(joi.object())
      .required(), // should be a Message entity at some point
    sentBy: joi.string().required(),
    section: joi.string().required(),
    assigneeId: joi
      .string()
      .allow(null)
      .optional(),
    assigneeName: joi
      .string()
      .allow(null)
      .optional(),
    docketNumber: joi.string().required(),
    docketNumberSuffix: joi
      .string()
      .allow(null)
      .optional(),
    caseId: joi
      .string()
      .uuid(uuidVersions)
      .required(),
    caseStatus: joi.string().optional(),
    document: joi.object().required(),
    createdAt: joi
      .date()
      .iso()
      .optional(),
    updatedAt: joi
      .date()
      .iso()
      .required(),
    completedAt: joi
      .date()
      .iso()
      .optional(),
  }),
  function() {
    return Message.validateCollection(this.messages);
  },
);

module.exports = WorkItemWithCaseInfo;
