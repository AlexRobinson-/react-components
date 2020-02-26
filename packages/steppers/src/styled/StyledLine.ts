/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled from 'styled-components';
import { getColor, DEFAULT_THEME } from '@zendeskgarden/react-theming';

export const StyledLine = styled.div`
  display: block;
  position: absolute;
  top: ${props => props.theme.space.base * 3}px;
  right: calc(50% + 20px);
  left: calc(-50% + 20px);
  border-top: ${props => props.theme.borders.sm};
  border-color: ${props => getColor('neutralHue', 300, props.theme)};
`;

StyledLine.defaultProps = {
  theme: DEFAULT_THEME
};