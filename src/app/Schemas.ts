import * as yup from 'yup';

const NAME_REQUIRED = 'Nazwa menu jest wymagana';
const URL_LINK = 'Link jest nieprawidłowy.';

export const AddSchema = yup.object().shape({
  name: yup.string().required(NAME_REQUIRED),
  link: yup.string().url(URL_LINK)
});
