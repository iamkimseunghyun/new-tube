import { HydrateClient, trpc } from '@/trpc/server';
import { PageClient } from '@/app/(home)/client';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Home = async () => {
  void trpc.hello.prefetch({ text: 'kaka' });

  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <PageClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};
export default Home;
