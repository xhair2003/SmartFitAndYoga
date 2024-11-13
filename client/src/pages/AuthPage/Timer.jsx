import React from 'react'
import Countdown from 'react-countdown';
import * as Components from './AuthStyles';

const Timer = () => {
  return (
    <Components.Timer>
      <Countdown date={Date.now() + 1*60*1000} />
    </Components.Timer>
  )
}

export default Timer