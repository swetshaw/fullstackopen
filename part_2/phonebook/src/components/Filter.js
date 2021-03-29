import React from 'react'

const Filter = (props) => {
 return(<div>
     <p>filter shown with</p> 
     <input value={props.name} onChange={props.onChange}></input>
 </div>)
}

export default Filter