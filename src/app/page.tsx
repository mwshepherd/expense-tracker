import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <main>
      <h1>Expenses App</h1>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
};

export default Home;
