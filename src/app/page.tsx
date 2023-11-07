import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-italic uppercase text-2xl">Expense Tracker</h1>
      <Link href="/dashboard" className="font-italic uppercase border border-white p-2 mt-4 hover:bg-white hover:text-black">
        Dashboard
      </Link>
    </main>
  )
}

export default Home
