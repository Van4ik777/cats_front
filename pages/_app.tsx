import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          primaryColor: 'grape',
          fontFamily: 'Verdana, sans-serif',
          headings: { fontFamily: 'Greycliff CF, sans-serif' },
        }}
      >
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </QueryClientProvider>
  )
}
