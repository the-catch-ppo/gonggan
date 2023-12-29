import ProposeList from '@/app/components/ProposeList'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function List({ params }: { params: { _id: string } }) {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <ProposeList session={session} params={params}/>
    </div>
  )
}
