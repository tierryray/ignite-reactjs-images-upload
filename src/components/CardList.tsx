import { Grid, SimpleGrid, useDisclosure } from '@chakra-ui/react';

import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [modalViewIsOpen, setModalViewIsOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  function handleViewImage(url: string): void {
    setImgUrl(url);
    setModalViewIsOpen(true);
  }

  function handleCloseViewImage(): void {
    setModalViewIsOpen(false);
  }

  return (
    <>
      {/* TODO CARD GRID */}
      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </Grid>

      <ModalViewImage
        isOpen={modalViewIsOpen}
        onClose={handleCloseViewImage}
        imgUrl={imgUrl}
      />
    </>
  );
}
