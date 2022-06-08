import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import { viVN } from "./locale";

const theme = createMuiTheme({
  palette,
  ...typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
}, viVN);

export default theme;
