import React from 'react'
import Navbar from './components/Navbar'
import IQTest from './components/IQTest'
import Footer from './components/Footer'


function NavFooter() {
    
    return (
        <>
            <Navbar />
           <div className='min-h-screen'>
           <IQTest />
           </div>
            <Footer />    </>
    )
}

export default NavFooter
