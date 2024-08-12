export default function ({ app }) {
  return {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#611E29',
          secondary: '#F4793C',
          error: '#ff7575',
        },
        dark: {
          primary: '#F4793C',
          secondary: '#611E29',
          error: '#ff7575',
        },
      },
    },
  };
}
