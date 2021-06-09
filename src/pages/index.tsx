import { Box, Button } from '@chakra-ui/react';

import { useInfiniteQuery } from 'react-query';
import { useMemo } from 'react';
import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

type FetchImagesResponse = {
  data: [
    {
      title: string;
      description: string;
      url: string;
      ts: number;
      id: string;
    }
  ];
  after: string | null;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({
    pageParam = null,
  }): Promise<FetchImagesResponse> => {
    const { data } = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data).flat();
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} mt={8}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
