import React from 'react'
import Header from '../Home/Header'
import Footer from '../Home/Footer'
import { Outlet } from 'react-router-dom'

function SharedLayOut() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default SharedLayOut