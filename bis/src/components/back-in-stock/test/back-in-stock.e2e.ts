import { newE2EPage } from '@stencil/core/testing';

describe('back-in-stock', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<back-in-stock></back-in-stock>');

    const element = await page.find('back-in-stock');
    expect(element).toHaveClass('hydrated');
  });
});
