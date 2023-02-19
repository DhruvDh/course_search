import {
  Component,
  onMount,
  Setter,
  mergeProps,
  Accessor
} from 'solid-js'

interface MainSearchProps {
  searchVal: Accessor<string>
  setSearchVal: Setter<string>
}

const MainSearch: Component<MainSearchProps> = (props) => {
  let ref!: HTMLInputElement
  const { setSearchVal, searchVal } = mergeProps(
    {
      setSearchVal: (val: string) =>
        console.error('You need to pass a setSearch function to MainSearch!'),
      searchVal: () => ''
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
        value={searchVal()}
        onInput={(e) => setSearchVal(e.currentTarget.value)}
      ></input>
    </div>
  )
}

export default MainSearch
