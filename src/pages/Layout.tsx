import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="layout">
        <header>
            <nav>
            </nav>
        </header>
        <section>
            <aside></aside>
            <main>
                <Outlet />
            </main>
        </section>
        <footer></footer>
    </div>
  )
}
