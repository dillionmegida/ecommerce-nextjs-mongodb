import { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  children: ReactNode
}

export default function SellerLayout({ children }: Props) {
  return (
    <div>
      <header className="container flex justify-between border-b border-grey-300 items-center">
        <div className="container flex justify-between items-center">
          <Link href="/">
            <a className="text-orange">Homepage</a>
          </Link>
          <nav>
            <ul className="flex items-center justify-center">
              <li>
                <Link href="/seller/add-product">
                  <a className="underline">Add Product</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {children}
    </div>
  )
}
