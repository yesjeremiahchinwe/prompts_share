"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"


const Navbar = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {

    const providers = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    providers()

  }, [])


  return (
    <nav className="flex-between items-center w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Website logo"
          width={30}
          height={30}
          priority
          className="object-contain"
        />

        <p className="logo_text">PromptShare</p>
      </Link>


      {/* -------------- Desktop Navigation ----------- */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn cursor-pointer">
              Create Post
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="outline_btn">
              Sign Out
            </button>

            <Link href="">
              <Image
                src="/assets/images/logo.svg"
                alt="User Icon"
                width={30}
                height={30}
                priority
                className="rounded-full"
              />
            </Link>
          </div>

        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>


      {/* --------------- Mobile Navigation ----------------- */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="Profile"
              width={30}
              height={30}
              priority
              onClick={() => setToggleDropdown((prev) => !prev)}
              className="rounded-full cursor-pointer"
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>

                <Link href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut;
                  }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>

        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar