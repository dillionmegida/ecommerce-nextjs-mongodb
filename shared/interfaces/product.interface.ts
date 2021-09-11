import Seller from './seller.interface'

export default interface ProductInterface {
  id: string
  name: string
  price: number
  description: string
  image_url: string
  seller: Seller
}
