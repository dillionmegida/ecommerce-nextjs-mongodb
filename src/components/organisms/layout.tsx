import Footer from '@molecules/footer'
import Header from '../molecules/header'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="mt-5 mb-10">{children}</div>
      <Footer />
    </div>
  )
}
