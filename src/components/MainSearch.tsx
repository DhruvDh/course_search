import { Component, onMount, Setter, mergeProps } from 'solid-js'

interface MainSearchProps {
  setSearchVal: Setter<string>
}

const MainSearch: Component<MainSearchProps> = (props) => {
  let ref!: HTMLInputElement
  const { setSearchVal } = mergeProps(
    {
      setSearchVal: (val: string) =>
        console.error('You need to pass a setSearch function to MainSearch!')
    },
    props
  )

  onMount(() => {
    ref.focus()
  })

  return (
    <div class="py-6 px-6 ">
      <input
        ref={ref}
        type="text"
        title="Search"
        placeholder="Search for anything!"
        class="w-full font-light font-sans py-6 px-3 border-b-4 focus:outline-0 focus:border-green-600 text-6xl transition-colors duration-[0.33s]"
        onInput={(e) => setSearchVal(e.currentTarget.value)}
      ></input>
    </div>
  )
}

export default MainSearch
