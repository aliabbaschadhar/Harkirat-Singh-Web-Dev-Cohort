This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Why Prioritize Next.js?

Next.js offers several advantages over traditional React applications:

1. **Improved SEO**: Server-side rendering provides better search engine visibility since content is available on initial page load.

2. **Performance**:
   - Automatic code splitting reduces initial load time
   - Server Components minimize JavaScript sent to the client
   - Image optimization via next/image
   - Automatic static optimization where possible

3. **Developer Experience**:
   - File-based routing system
   - API routes built-in
   - Built-in TypeScript support
   - Fast Refresh for immediate feedback

4. **Hybrid Rendering**: Flexible rendering strategies (SSR, SSG, ISR) allow for optimal performance and user experience based on page requirements.

## Rendering Strategies

### Client-Side Rendering (CSR)

![CSR in React](/public/csr(react).png)

In traditional React apps, the browser loads a minimal HTML file and JavaScript bundle. The JavaScript then renders the application in the browser, making data fetching requests after the initial load. This approach can lead to:

- Longer time to first meaningful paint
- Poor SEO as crawlers see empty content
- User sees loading states

### Server-Side Rendering (SSR)

![SSR in Next.js](/public/ssr(next).png)

Next.js can render pages on the server for each request:

- HTML is generated on the server
- User sees content immediately
- Better SEO as full content is delivered in initial HTML
- Reduced client-side JavaScript needed

## Common Next.js Problems and Solutions

### Waterfalling Problem

The waterfalling problem occurs when multiple data fetches happen sequentially rather than in parallel.

```jsx
// Problematic approach (waterfall)
async function Page() {
  const user = await fetchUser()
  const orders = await fetchOrdersByUser(user.id) // Waits for user fetch
  return <OrderList orders={orders} />
}

// Solution: Parallel data fetching
async function Page() {
  const userPromise = fetchUser()
  const ordersPromise = userPromise.then(user => fetchOrdersByUser(user.id))
  
  const [user, orders] = await Promise.all([userPromise, ordersPromise])
  return <OrderList user={user} orders={orders} />
}
```

Next.js 14 provides utilities like React.cache and new data fetching patterns to help mitigate this issue.

## Routing in Next.js

Next.js uses a file-based routing system within the `app` directory:

```
app/
├── page.tsx          # Home route (/)
├── about/
│   └── page.tsx      # About route (/about)
├── blog/
│   ├── page.tsx      # Blog index (/blog)
│   └── [slug]/       # Dynamic route
│       └── page.tsx  # Blog post (/blog/post-1)
```

Special files in Next.js routing:

- `page.tsx`: Defines a route that is publicly accessible
- `layout.tsx`: Creates shared layouts for multiple pages
- `loading.tsx`: Creates loading UI with Suspense
- `error.tsx`: Creates error UI with Error Boundaries
- `not-found.tsx`: Custom 404 page

## Layouts in Next.js

Layouts in Next.js define shared UI for multiple pages. The root layout applies to all routes and must contain html and body tags.

```jsx
// app/layout.tsx (Root layout)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// app/dashboard/layout.tsx (Nested layout)
export default function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardNav />
      <div className="dashboard-content">{children}</div>
    </div>
  )
}
```

Benefits of layouts:

- Preserved state across page navigations
- No re-rendering unless necessary
- Nested layouts composition
- Streaming support

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
