import React from 'react'

const Loading = () => {
    return (
        <div className="h-[80vh] flex justify-center items-center w-[100vw] bg-white relative">
            <div className="lds-roller "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading
