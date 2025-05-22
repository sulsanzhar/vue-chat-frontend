<template>
    <div class="relative mx-auto block text-center group">
        <input
            class="w-full rounded-xl pl-10 p-4 text-white bg-[rgb(46,51,70)] border border-transparent
        focus:outline-none focus:ring-2 focus:ring-[rgb(103,133,255)]
        focus:shadow-lg transition-all duration-300 ease-in-out placeholder-gray-400"
            placeholder="Search..."
            type="text"
        />
        <div class="absolute left-3 top-1/2 -translate-y-1/2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                class="fill-white transition duration-300 group-focus-within:fill-[rgb(105,135,255)]"
            >
                <path
                    d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
                />
            </svg>
        </div>
    </div>
</template>
