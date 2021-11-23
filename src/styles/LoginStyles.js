// export default {
//   Login: {
//     height: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   LoginCard: {
//     height: '600px',
//     width: '375px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     backgroundColor: 'var(--background-white)',
//     borderRadius: '5px',
//     boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
//     animationName: '$LoginCardEmailFormAnimateIn',
//     animationIterationCount: 1,
//     animationTimingFunction: 'ease-in-out',
//     animationDuration: '0.5s',
//     '& .animateOut': {
//       animationName: '$LoginEmailFormCardAnimateOut',
//       animationIterationCount: 1,
//       animationTimingFunction: 'ease-out',
//       animationDuration: '0.2s',
//     },
//   },
//   '@keyframes LoginCardEmailFormAnimateIn': {
//     '0%': {
//       opacity: 0,
//       transform: 'translateY(25%)',
//     },
//     '20%': {
//       opacity: 0.03,
//     },
//     '40%': {
//       opacity: 0.1,
//     },
//     '60%': {
//       opacity: 0.3,
//     },
//     '80%': {
//       opacity: 0.6,
//     },
//     '100%': {
//       opacity: 1,
//       transform: 'translateY(0%)',
//     },
//   },

//   '@keyframes LoginEmailFormCardAnimateOut': {
//     '0%': {
//       opacity: 1,
//       transform: 'translateX(0%)',
//     },
//     '30%': {
//       opacity: 0.7,
//     },
//     '100%': {
//       opacity: 0,
//       transform: 'translateX(-50%)',
//     },
//   },

//   buttonWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     paddingTop: '15px',
//   },
//   loginButton: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'var(--text-white)',
//     textTransform: 'uppercase',
//     textDecoration: 'none',
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     fontSize: '16px',
//     fontWeight: '400',
//     background: 'var(--button-primary)',
//     width: '200px',
//     height: '50px',
//     margin: '10px',
//     border: 'none',
//     transition: 'all 0.4s ease 0s',
//     borderRadius: '5px',
//     '& svg': {
//       fontSize: '30px',
//     },
//     '&:hover': {
//       background: 'var(--button-accept)',
//       transition: 'all 0.4s ease 0s',
//       cursor: 'pointer',
//     },
//   },
//   buttonText: {
//     padding: '2px 10px 0px 0px',
//   },
//   '@media (max-height: 650px)': {
//     loginCard: {
//       height: '500px',
//     },
//   },
// };
