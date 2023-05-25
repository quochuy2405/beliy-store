'use client'
import { Finish } from '@/components/templates'
import { getCookie } from 'cookies-next'
import { useParams } from 'next/navigation'
import shortid from 'shortid'
const FinishPage = () => {
  const params = useParams()
  if (!shortid.isValid(params.id) || params.id != getCookie('checkout_id'))
    return <Finish status="error" />
  return <Finish status="success" />
}

export default FinishPage
