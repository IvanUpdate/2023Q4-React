import React, { useState, ChangeEvent } from 'react';

interface AutoCompleteProps {
  options: string[];
  onSelect: (value: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSuggestions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    onSelect(value);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
        required
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
