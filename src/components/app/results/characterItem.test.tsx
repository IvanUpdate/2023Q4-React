import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterItem from './characterItem';

const mockChangeCharacter = vi.fn();

const testCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  type: 'Human',
  location: 'Earth',
  image: 'rick_image_url',
  species: 'Human',
};

describe('Character Component', () => {
  it('renders character card with correct data', () => {
    const { getByText, getByAltText } = render(
      <CharacterItem {...testCharacter} changeCharacter={mockChangeCharacter} />
    );

    expect(
      getByText(`${testCharacter.name} from ${testCharacter.location}`)
    ).toBeInTheDocument();
    expect(getByAltText(testCharacter.name)).toBeInTheDocument();
    expect(getByText(`Status: ${testCharacter.status}`)).toBeInTheDocument();
    expect(getByText(`Type: ${testCharacter.type}`)).toBeInTheDocument();
    expect(getByText(`Species: ${testCharacter.species}`)).toBeInTheDocument();
  });

  it('check card details when card is clicked', () => {
    const { container } = render(
      <CharacterItem {...testCharacter} changeCharacter={mockChangeCharacter} />
    );

    const cardElement = container.firstChild;

    if (cardElement !== null) {
      fireEvent.click(cardElement);
      expect(screen.getByText(`Status: ${testCharacter.status}`)).toBeInTheDocument();
    } else {
      throw new Error('Card element is null');
    }
  });

  it('calls changeCharacter when the card is clicked', () => {
    const mockChangeCharacter = vi.fn();

    const { getByText } = render(
      <CharacterItem
        id={1}
        name="Rick Sanchez"
        status="Alive"
        type="Human"
        location="Earth"
        image="rick_image_url"
        species="Human"
        changeCharacter={mockChangeCharacter}
      />
    );

    fireEvent.click(getByText('Rick Sanchez from Earth'));

    expect(mockChangeCharacter).toHaveBeenCalledWith(1);
  });

  
});

describe('handleDivClick testing by click', () => {
  it('calls changeCharacter when clicked', () => {
    const mockChangeCharacter = vi.fn();
    const { getByTestId} = render(
      <CharacterItem
        id={1}
        name="Rick Sanchez"
        status="Alive"
        type="Human"
        location="Earth"
        image="rick_image_url"
        species="Human"
        changeCharacter={mockChangeCharacter}
      />
    );
    const resultsContainer = getByTestId('div-container');

    fireEvent.click(resultsContainer);

    expect(mockChangeCharacter).toHaveBeenCalled();
  });
});

