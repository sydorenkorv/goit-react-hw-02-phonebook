import PropTypes from 'prop-types';

import css from '../ContactList/ContactList.module.css';

export const ContactList = ({ contacts, children, deleteContact }) => {
  return (
    <div className={css.contacts}>
      <h2>Contacts</h2>
      {children}
      <ul className={css.contacts__list}>
        {contacts.map(({ id, name, number }) => (
          <li className={css.contacts__item} key={id}>
            <p className={css.contacts__name}>{name}</p>
            <p className={css.contacts__number}> {number}</p>
            <button
              onClick={() => {
                deleteContact(id);
              }}
              className={css.contacts__btn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func,
};
