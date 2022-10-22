import type { Component, Setter } from 'solid-js'
import { mergeProps } from 'solid-js'

interface MainSearchProps {
  setSearchVal: Setter<string>
}

const MainSearch: Component<MainSearchProps> = (props) => {
  const { setSearchVal } = mergeProps(
    {
      setSearchVal: (val) =>
        console.error('You need to pass a setSearch function to MainSearch!')
    },
    props
  )

  return (
    <div class="py-6 px-6">
      <input
        type="text"
        title="Search"
        placeholder="Search for anything!"
        class="w-full font-light font-sans py-6 px-3 border-b-4 focus:outline-0 focus:border-green-600 text-6xl"
        onInput={(e) => setSearchVal(e.currentTarget.value)}
      ></input>
    </div>
  )
}

export default MainSearch
