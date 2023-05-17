import { ProductList, PromoteSection } from '../organisms'

const Home = () => {
  return (
    <div>
      <PromoteSection />
      <ProductList keyCondition="all" title="Sản phẩm nổi bật" />
    </div>
  )
}

export default Home
