import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'
import { Countries, Layout, Search } from '../layouts/index'

export default function Home({
  countries,
}: {
  countries: InferGetStaticPropsType<GetStaticProps>
}) {
  const [keyword, setKeyword] = useState('')

  const filtedCountries = countries.filter(
    (country: {
      name: string
      region: string
      subregion: string
      alpha2Code: string
      alpha3Code: string
    }) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword) ||
      country.alpha2Code.toLowerCase().includes(keyword) ||
      country.alpha3Code.toLowerCase().includes(keyword)
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <>
      <Head>
        <title>Next World Rank</title>
        <meta
          name="description"
          content="A simple website to check all the countries in the world data"
        />
      </Head>

      <Layout>
        <div className="my-3">Found {countries.length} countries</div>

        <Search
          placeholder="Filter by Name, Region, or SubRegion"
          onChange={handleInputChange}
        />

        <Countries countries={filtedCountries} />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://restcountries.com/v2/all')
  const countries = await response.json()

  return {
    props: {
      countries,
    },
  }
}
