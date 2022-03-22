import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { Layout } from '../../layouts'
import { BlurImage } from '../../layouts/BlurImage'

export default function Country({
  country,
}: InferGetStaticPropsType<GetStaticProps>) {
  return (
    <>
      <Head>
        <title>{country.name}</title>
        <meta
          name="description"
          content={`Check out everything about ${country.name}.`}
        />
      </Head>

      <Layout>
        <h1 className="mb-4 text-4xl font-bold">{country.name}</h1>
        <div className="relative min-h-screen w-[100%]">
          <BlurImage src={country.flag} alt={country.name} layout="fill" />
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({
  params,
}: InferGetStaticPropsType<GetStaticProps>) => {
  const response = await fetch(
    `https://restcountries.com/v2/alpha/${params.id}`
  )

  const country = await response.json()

  return {
    props: {
      country,
    },
  }
}
