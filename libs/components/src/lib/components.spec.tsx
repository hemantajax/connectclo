import { render } from '@testing-library/react';

import ConnectstoreComponents from './components';

describe('ConnectstoreComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConnectstoreComponents />);
    expect(baseElement).toBeTruthy();
  });
});
