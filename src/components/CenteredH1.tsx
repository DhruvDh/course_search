import { Component, JSXElement, mergeProps } from 'solid-js'

interface H1Props {
  text?: string
  children?: JSXElement
}

const H1: Component<H1Props> = (props) => {
  const { text, children } = mergeProps(
    {
      text: '',
      children: undefined
    },
    props
  )

  return (
    <>
      <div class="flex items-center justify-center top-0 bottom-0">
        <div
          class="text-6xl font-light font-sans  text-gray-300"
          innerText={text}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default H1
