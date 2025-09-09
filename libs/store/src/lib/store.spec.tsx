import { render } from '@testing-library/react';

import ConnectstoreStore from './store';

describe('ConnectstoreStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConnectstoreStore />);
    expect(baseElement).toBeTruthy();
  });
});
