import { auth } from '@/auth'
import BookList from '@/components/BookList'
import BookOverview from '@/components/BookOverview'
import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import { desc } from 'drizzle-orm'
import React from 'react'

const Home = async () => {
  const session = await auth();
  const latestBook = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createAt))) as Book[]
  return (
    <>
      <BookOverview
        {...latestBook[0]} userId={session?.user?.id as string}
      />

      <BookList
        title="Latest Books"
        books={latestBook.slice(1)}
        containerClassName="mt-28"
      />
    </>
  )
}

export default Home