import { ImageOptimizing } from '../atoms'
import { ProductList, PromoteSection } from '../organisms'

const Home = () => {
  return (
    <div>
      <div className="h-[110vh]">
        <ImageOptimizing src="/banner2.png" objectFit="cover" />
      </div>
      <PromoteSection />
      <ProductList conditions={[]} title="Sản phẩm nổi bật" />
    </div>
  )
}

export default Home
