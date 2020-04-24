import React from 'react';
import './Badge.css';
import cx from 'classnames';
import Emoji from 'a11y-react-emoji';
import { emojis } from './emojis-type';

function Badge ({ className, type = '', ...props }) {

  const typeClassName = type.toLowerCase().replace(/_/, '-');
  const classnames = cx('Badge', className, `Badge--${typeClassName}`);
  return (
    <div className={classnames}>
      {props.emoji && emojis[type]}
      {type}
    </div>
  );
}

export default Badge;

