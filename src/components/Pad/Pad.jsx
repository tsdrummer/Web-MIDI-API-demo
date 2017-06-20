import React from 'react'
import cn from 'classnames'
import './Pad.css'

export default ({ status }) => {
    const st = cn('pad', {active: status})
    return <div className={st}/>
}
