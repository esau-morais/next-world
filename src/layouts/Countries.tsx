import Link from 'next/link'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const handleCountriesOrder = (
  countries: any,
  value: string,
  direction: string
) => {
  if (direction === 'asc') {
    return [...countries].sort((a: any, b: any) =>
      a[value] > b[value] ? 1 : -1
    )
  }

  if (direction === 'desc') {
    return [...countries].sort((a: any, b: any) =>
      a[value] > b[value] ? -1 : 1
    )
  }
}

const SortingArrows = ({ direction }: { direction: string }) => {
  if (!direction) return <></>

  if (direction === 'desc') {
    return (
      <div className="ml-[2px] flex items-center justify-center">
        <IoIosArrowDown />
      </div>
    )
  } else {
    return (
      <div className="ml-[2px] flex items-center justify-center">
        <IoIosArrowUp />
      </div>
    )
  }
}

export default function Countries({ countries }: any): JSX.Element {
  const [direction, setDirection] = useState('desc')
  const [value, setValue] = useState('')

  const orderedCountries = handleCountriesOrder(countries, value, direction)

  const handleDirectionSwitch = () => {
    if (!direction) {
      setDirection('desc')
    } else if (direction === 'desc') {
      setDirection('asc')
    } else {
      setDirection('desc')
    }
  }

  const setValueAndDirection = (value: any) => {
    handleDirectionSwitch()
    setValue(value)
  }

  return (
    <div>
      <div className="flex">
        <button
          className="flex flex-1 items-center justify-start border-r-[1px] border-purple-400 bg-transparent p-5 text-left font-medium"
          onClick={() => setValueAndDirection('name')}
        >
          <div>Name</div>

          <SortingArrows direction={direction} />
        </button>

        <button
          className="flex items-center justify-center flex-1 p-5 font-medium bg-transparent border-none"
          onClick={() => setValueAndDirection('population')}
        >
          <div>Population</div>

          <SortingArrows direction={direction} />
        </button>
      </div>

      {orderedCountries?.map((country, index) => (
        <Link href={`/country/${country.alpha3Code}`} key={index}>
          <div className="flex p-5 mb-4 font-medium text-center rounded-lg cursor-pointer bg-slate-200 outline outline-1 outline-purple-700">
            <div className="flex-1 text-left">{country.name}</div>
            <div className="flex-1">{country.population}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
