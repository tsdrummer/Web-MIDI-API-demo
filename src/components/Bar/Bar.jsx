import React from 'react'
import './Bar.css'

export default ({ height, backgroundColor }) => (
    <div style={ {height: height*4, backgroundColor} } className="bar">{height.toString()}</div>
)
