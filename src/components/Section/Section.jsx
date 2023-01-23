import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => (
  <section>
    <h2 className="title">{title}</h2>
    {children}
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Section;
