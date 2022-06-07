import palette from '../palette';
import typography from '../typography';

export default {
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${palette.divider}`,
    padding: '8px',
    fontSize: 13
  },
  head: {
    fontWeight: 700
  }
};
