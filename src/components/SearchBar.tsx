// import react, { useRef, useState, useEffect } from "react";
// interface SearchProps {
//     isOpen: boolean;
//     setIsOpen: react.Dispatch<react.SetStateAction<boolean>>;
// }

// export default function SearchBar({ isOpen, setIsOpen }: SearchProps) {
//     console.log("ISOPENL", isOpen)
//     const targetRef = useRef<any>();
//     const [focused, setFocused] = useState(true)
//     const target2 = useRef<any>();

//     // useEffect(() => {
//     //     if (targetRef.current) {
//     //     window.addEventListener("click", (e) => {
//     //         console.log(e.target, target2?.current)
//     //         if (e.target === targetRef?.current || e.target === target2?.current) {
//     //             console.log("focused")
//     //             setFocused(true)
//     //             setIsOpen(true);
//     //         }
//     //         else {
//     //             console.log("Not Focused");
//     //             setFocused(false)
//     //             setIsOpen(false);
//     //         };
//     //     })
//     // }})

//     console.log("STATE ", isOpen)
//     return (
//         <>
//             {isOpen && focused && <div className="fixed w-full z-10 bg-black bg-opacity-50 transition-all duration-500 " style={{ height: '100vh' }}>
//                 <div className="relative h-full top-12">
//                     <div className="flex items-center justify-center">
//                         <div className="flex space-x-1 py-4" ref={targetRef} onBlur={() => {
//                             console.log(targetRef?.current?.value)
//                         }}>
//                             <input
//                                 type="text"
//                                 className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                                 placeholder="Search..."
//                             />
//                             <button className="px-4 text-white bg-purple-600 rounded-full ">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="w-5 h-5"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                     strokeWidth={2}
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>

//                     </div>
//                     <div className="products flex justify-center " >
//                         <div className="absolute bg-slate-300 h-full w-3/4 rounded-lg" ref={target2}>

//                         </div>
//                     </div>
//                 </div>
//             </div>}
//         </>
//     );
// }
import React from 'react';

const SearchBar = () => {
  return <div>SearchBar</div>;
};

export default SearchBar;
