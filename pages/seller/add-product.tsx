import AddProductForm from '@molecules/seller/add-product-form'
import SellerLayout from '@organisms/seller-layout'

export default function AddProduct() {
  return (
    <SellerLayout>
      <div className="container">
        <AddProductForm />
      </div>
    </SellerLayout>
  )
}
