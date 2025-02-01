// export const revalidate = 5
// export default async function PostsPage() {
//   const posts = await getPosts()

//   return (
//     <div className='p-6'>
//       <h1 className='mb-4 text-2xl font-bold'>Random Posts</h1>
//       <ul className='space-y-4'>
//         {posts.map((post: any) => (
//           <li key={post.id} className='rounded-lg border p-4'>
//             <h2 className='text-lg font-semibold'>{post.title}</h2>
//             <p className='text-gray-600'>{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// async function getPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//     //   cache: "no-store", // Ensures fresh data on each request
//     // next: { revalidate: 5 },
//   })

//   const data = await res.json()

//   // Shuffle the posts array to return random posts on each request
//   return data.sort(() => Math.random() - 0.5).slice(0, 5)
// }

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className='p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Random Posts</h1>
      <ul className='space-y-4'>
        {posts.map((post: any) => (
          <li key={post.id} className='rounded-lg border p-4'>
            <h2 className='text-lg font-semibold'>{post.title}</h2>
            <p className='text-gray-600'>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //   cache: "no-store", // Ensures fresh data on each request
    next: { revalidate: 5 },
  })

  const data = await res.json()

  // Shuffle the posts array to return random posts on each request
  return data.sort(() => Math.random() - 0.5).slice(0, 5)
}
