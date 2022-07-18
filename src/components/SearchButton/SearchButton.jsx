import { BsSearch } from 'react-icons/bs';
import { StyledSearchButton } from './SearchButton.styled';

export const SearchButton = () => {
  return (
    <StyledSearchButton>
      <BsSearch size={'20px'} />
    </StyledSearchButton>
  );
};
