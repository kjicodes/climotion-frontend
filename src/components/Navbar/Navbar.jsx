import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import './Navbar.css';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BoltIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Get Workouts', href: '/workouts' },
  { name: 'Log In', href: '/login'},
  { name: 'Register', href: '/register'}
]


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50 pt-5 px-8 md:mx-10">
        <nav aria-label="Global" className="flex items-center justify-between">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex hover:opacity-75">
              <span className="sr-only">Climotion</span>
              <p className="text-lg font-bold">Climotion</p>
              <BoltIcon className="nav-bolt h-6 w-6 ml-2 self-center" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="nav-items -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation
              .filter((item) => item.name !== 'Register')
              .map((item) => (
              <NavLink key={item.name} to={item.href} className="nav-links text-sm/6 font-semibold">
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
            <NavLink to="/register" className="nav-links-register text-xs font-semibold border rounded-full px-4 py-2 shadow-xs text-black">
              Register <span className="px-3" aria-hidden="true">&rarr;</span>
            </NavLink>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Climotion</span>
                <img
                  alt=""
                  src=""
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="nav-items -m-2.5 rounded-md p-2.5"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation
                    .filter((item) => item.name !== 'Log In' && item.name !== 'Register')
                    .map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className="nav-links -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                      >
                        {item.name}
                      </NavLink>
                  ))} 
                </div>
                <div className="py-6">
                  {navigation
                    .filter((item) => item.name === 'Log In' || item.name === 'Register')
                    .map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className="nav-links -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                      >
                        {item.name}
                      </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
