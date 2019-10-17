/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import { Button } from '@zendeskgarden/react-buttons';

const DefaultExample = () => {
  return <Button onClick={() => alert('test')}>Hello world this is working</Button>;
};

export default DefaultExample;
