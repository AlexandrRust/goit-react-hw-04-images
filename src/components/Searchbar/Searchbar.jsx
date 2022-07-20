import { Formik } from 'formik';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormInput,
} from './Searchbar.styled';
import { SearchButton } from 'components/SearchButton/SearchButton';
import * as yup from 'yup';

// const initial = {
//   query: '',
// };

export const Searchbar = ({ onSubmit }) => {
  const schema = yup.object().shape({
    query: yup.string().min(3).required(),
  });
  const handleSubmit = (values, { resetForm }) => {
    const { query } = values;
    onSubmit({ query, page: 1 });
    resetForm();
  };
  return (
    <SearchBarHeader className="searchbar">
      <Formik
        initialValues={{ query: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <SearchForm className="form">
          <SearchButton type="submit" className="button" />
          <SearchFormInput
            className="input"
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchBarHeader>
  );
};
