import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import View from '../core/View'
import Selectable from '../core/Selectable'

import styles from './styles.css'

class Item extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onSelect: PropTypes.func,
    role: PropTypes.string,
    selected: PropTypes.bool,
    testId: PropTypes.string,
    value: PropTypes.any
  }

  static defaultProps = {
    disabled: false,
    role: 'menuitem'
  }

  render () {
    const {
      children,
      disabled,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      role,
      selected,
      testId
    } = this.props

    return (
      <View
        aria-activedescendant={ selected }
        aria-disabled={ disabled }
        className={ classNames(styles.item, {
          [styles.disabled]: disabled,
          [styles.selected]: selected
        }) }
        disabled={ disabled }
        onMouseDown={ onMouseDown }
        onMouseEnter={ onMouseEnter }
        onMouseLeave={ onMouseLeave }
        role={ role }
        testId={ testId }
      >
        { children }
      </View>
    )
  }
}

export default Selectable(Item, { preventDefault: true })
