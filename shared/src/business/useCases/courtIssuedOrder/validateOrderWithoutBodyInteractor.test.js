const {
  validateOrderWithoutBodyInteractor,
} = require('./validateOrderWithoutBodyInteractor');
const { OrderWithoutBody } = require('../../entities/orders/OrderWithoutBody');

describe('validateOrderWithoutBodyInteractor', () => {
  it('returns the expected errors object on an empty order object', () => {
    const errors = validateOrderWithoutBodyInteractor({
      applicationContext: {
        getEntityConstructors: () => ({
          OrderWithoutBody,
        }),
      },
      orderMetadata: {},
    });

    expect(errors).toEqual({
      documentTitle: 'Order title is required.',
      documentType: 'Order type is required.',
      eventCode: 'Order type is required.',
    });
  });

  it('returns no errors when a valid order object is passed through', async () => {
    const errors = await validateOrderWithoutBodyInteractor({
      applicationContext: {
        getEntityConstructors: () => ({
          OrderWithoutBody,
        }),
      },
      orderMetadata: {
        documentTitle: 'Order to Be Awesome',
        documentType: 'Order',
        eventCode: 'O',
      },
    });

    expect(errors).toEqual(null);
  });
});