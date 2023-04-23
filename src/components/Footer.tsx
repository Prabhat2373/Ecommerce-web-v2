import React from 'react'

const Footer = () => {
    return (
        <>
            <div className="bg-[#1E1E1E] grid grid-cols-1 justify-center sm:grid-cols-2 gap-4 md:grid-cols-3 text-white p-10" >
                <div>
                    <h1>W-SHOP</h1>
                    <ul>
                        <li>Address: Pune, Maharashtra</li>
                        <li>E-mail: Example@gmail.com</li>
                        <li>Phone: 0092 356 3656210</li>
                    </ul>
                </div>
                <div>
                    <h1>About</h1>
                    <ul>
                        <li>E-Commerce Online Seller</li>
                        <li>E-mail: Example@gmail.com</li>
                        <li>Phone: 0092 356 3656210</li>
                    </ul>
                </div>
                <div>
                    <h1>Contact</h1>
                    <ul>
                        <li>Address: Lahore Road, Sheikhupura</li>
                        <li>E-mail: Example@gmail.com</li>
                        <li>Phone: 0092 356 3656210</li>
                    </ul>
                </div>
            </div>
            <footer className="bg-black text-white text-center p-5">
                <p>copyright @prabhat | 2022 </p>
            </footer>
        </>
    )
}

export default Footer