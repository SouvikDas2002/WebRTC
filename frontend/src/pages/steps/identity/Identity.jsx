import React from 'react'

function Identity({onNext}){
  return (
    <>
    <div>Phone Or Email</div>
    <button onClick={onNext}>Next</button>
    </>
  )
}

export default Identity