export default {
  down(size) {
    const sizes = {
      xs: '576px',
      sm: '700px',
      md: '950px',
      lg: '1200px',
    };
    return `@media (max-width: ${sizes[size]})`;
  },
  up(size) {
    const sizes = {
      xs: '576px',
      sm: '700px',
      md: '950px',
      lg: '1200px',
    };
    return `@media (min-width: ${sizes[size]})`;
  },
};
