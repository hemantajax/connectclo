import { render } from '@testing-library/react';

import ConnectstoreShared from './shared';

describe('ConnectstoreShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConnectstoreShared />);
    expect(baseElement).toBeTruthy();
  });
});
