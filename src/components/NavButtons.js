import React from 'react';

const NavButtons = (props) => {

    const prevPageHandler = () => {
        props.change(-1)
    }
    
    const nextPageHandler = () => {
        props.change(1)
    }
    return (
        <div>
            <button onClick={prevPageHandler}>{'Prev Page'}</button>
            <button onClick={nextPageHandler}>{'Next Page'}</button>
        </div>
    )
}

export default NavButtons