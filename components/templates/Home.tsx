import Image from 'next/image'
import { ProductList, PromoteSection } from '../organisms'

const Home = () => {
  return (
    <div>
      <div className="h-[110vh]">
        <Image
          alt=""
          width={2000}
          height={2000}
          src="/banner2.png"
          className="
        w-full h-full object-cover"
        />
      </div>
      <PromoteSection />
      <ProductList conditions={[]} title="Sản phẩm nổi bật" />
    </div>
  )
}

export default Home
