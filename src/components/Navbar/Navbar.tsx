export function Navbar() {
    const items = [
        { link: '/', label: 'Home' },
        { link: '/signup', label: 'Sign up' },
        { link: '/signin', label: 'Sign in ' },
    ]

    const itemsLinks = items.map((item, index) =>
        <a key={index} href={item.link} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{item.label}</a>)

    return (<>
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            {/* {<img
                                className="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />} */}
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {itemsLinks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}