import { newSpecPage } from '@stencil/core/testing';
import { BackInStock } from '../back-in-stock';

describe('back-in-stock', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BackInStock],
      html: `<back-in-stock></back-in-stock>`,
    });
    expect(page.root).toEqualHtml(`
      <back-in-stock>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </back-in-stock>
    `);
  });
});
