import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { utils as themingUtils } from '@zendeskgarden/react-theming';

import utils from './utils';
import KEY_CODES from './KEY_CODES';

export class SelectionContainer extends PureComponent {
    static propTypes = {
      /**
         * Function that is provided:
         * `getItemProps, getContainerProps, highlightedIndex, selectedIndex`
         */
      children: PropTypes.func.isRequired,
      /**
         * Whether the up/down or left/right arrow keys
         * should be used for keyboard navigation
         */
      vertical: PropTypes.bool,
      /** The currently selected index. Used as a controlled element. */
      selectedIndex: PropTypes.number,
      /** Called when a new index is selected. Used as a controlled element. */
      onSelection: PropTypes.func,
      highlightOnFocus: PropTypes.bool
    };

    constructor(...args) {
      super(...args);

      this.state = {
        highlightedIndex: undefined,
        selectedIndex: undefined
      };

      this.mousedDown = false;
      this.items = [];
    }

    /**
     * Used to help retrieve state that can be controlled through props
     */
    retrieveState = () => {
      const highlightedIndex = this.state.highlightedIndex;
      const selectedIndex = typeof this.props.selectedIndex === 'undefined' ?
        this.state.selectedIndex : this.props.selectedIndex;

      return {
        highlightedIndex,
        selectedIndex
      };
    };

    /**
     * Props that should be applied to any selectable item
     */
    getItemProps = ({ item, index, onClick, onMouseDown, ...rest } = {}) => {
      if (typeof item === 'undefined') {
        throw new Error('"item" must be defined');
      }

      if (index === undefined) {
        this.items.push(item);
        index = this.items.indexOf(item);
      } else {
        this.items[index] = item
      }

      return {
        onClick: utils.composeEventHandlers(onClick, () => {
          this.selectIndex(index);
        }),
        onMouseDown: utils.composeEventHandlers(onMouseDown, () => {
          this.mousedDown = true;

          setTimeout(() => {
            this.mousedDown = false;
          }, 0);
        }),
        ...rest
      };
    };

    incrementIndex = () => {
      const { highlightedIndex } = this.retrieveState();

      if (typeof highlightedIndex === 'undefined') {
        this.setState({ highlightedIndex: 0 });
      } else {
        this.setState({ highlightedIndex: highlightedIndex < this.items.length - 1 ? highlightedIndex + 1 : 0 });
      }
    };

    decrementIndex = () => {
      const { highlightedIndex } = this.retrieveState();

      if (typeof highlightedIndex === 'undefined') {
        this.setState({ highlightedIndex: this.items.length - 1 });
      } else {
        this.setState({ highlightedIndex: highlightedIndex > 0 ? highlightedIndex - 1 : this.items.length - 1 });
      }
    };

    selectIndex = (selectedIndex, highlightedIndex) => {
      const { onSelection } = this.props;

      if (onSelection) {
        onSelection(selectedIndex, this.items[selectedIndex]);
      } else {
        this.setState({
          selectedIndex,
          highlightedIndex
        });
      }
    };

    keyDownEventHandlers = {
      [KEY_CODES.ENTER]: event => {
        event.preventDefault();

        const { highlightedIndex } = this.retrieveState();
        if (typeof highlightedIndex !== 'undefined') {
          this.selectIndex(highlightedIndex, highlightedIndex);
        }
      },
      [KEY_CODES.SPACE]: event => {
        event.preventDefault();

        const { highlightedIndex } = this.retrieveState();
        if (typeof highlightedIndex !== 'undefined') {
          this.selectIndex(highlightedIndex, highlightedIndex);
        }
      },
      [KEY_CODES.END]: event => {
        event.preventDefault();

        this.setState({
          highlightedIndex: this.items.length - 1
        });
      },
      [KEY_CODES.HOME]: event => {
        event.preventDefault();

        this.setState({
          highlightedIndex: 0
        });
      },
      [KEY_CODES.LEFT]: event => {
        const { vertical } = this.props;
        const isRtl = themingUtils.isRtl(this.props);

        if (!vertical) {
          event.preventDefault();

          if (isRtl) {
            this.incrementIndex()
          } else {
            this.decrementIndex();
          }
        }

      },
      [KEY_CODES.RIGHT]: event => {
        const { vertical } = this.props;
        const isRtl = themingUtils.isRtl(this.props);

        if (!vertical) {
          event.preventDefault();

          if (isRtl) {
            this.decrementIndex()
          } else {
            this.incrementIndex();
          }
        }
      },
      [KEY_CODES.UP]: event => {
        const { vertical } = this.props;
        const isRtl = themingUtils.isRtl(this.props);

        if (vertical) {
          event.preventDefault();

          if (isRtl) {
            this.incrementIndex()
          } else {
            this.decrementIndex();
          }
        }
      },
      [KEY_CODES.DOWN]: event => {
        const { vertical } = this.props;
        const isRtl = themingUtils.isRtl(this.props);

        if (vertical) {
          event.preventDefault();

          if (isRtl) {
            this.decrementIndex()
          } else {
            this.incrementIndex();
          }
        }
      }
    };

    /**
     * Props that should be applied to the container that triggers selection of items
     */
    getContainerProps = ({ onFocus, onBlur, onKeyDown, ...other } = {}) => {
      const { selectedIndex } = this.retrieveState();
      const { highlightOnFocus } = this.props;

      return {
        onFocus: utils.composeEventHandlers(onFocus, (event) => {
          if (!this.mousedDown) {
            if (highlightOnFocus) {
              this.setState({ highlightedIndex: selectedIndex || 0 });
            }
          }
        }),
        onBlur: utils.composeEventHandlers(onBlur, (event) => {
          this.setState({ highlightedIndex: undefined });
        }),
        onKeyDown: utils.composeEventHandlers(onKeyDown, (event) => {
          const keyHandler = this.keyDownEventHandlers[event.keyCode];
          keyHandler && keyHandler(event);
        }),
        tabIndex: 0,
        ...other
      };
    }

    render() {
      const { children } = this.props;
      const { highlightedIndex, selectedIndex } = this.retrieveState();
      this.items = [];

      return children({
        getItemProps: this.getItemProps,
        getContainerProps: this.getContainerProps,
        highlightedIndex,
        selectedIndex
      });
    }
};

export default themingUtils.withTheme(SelectionContainer);
