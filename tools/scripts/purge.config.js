const sourceDir = 'apps/connectstore/dist/assets';

/**
 * Shared configuration for PurgeCSS and UnCSS for Connect CLO Nx Workspace
 */
module.exports = {
  // Source directory for built CSS files (Vite build output)
  sourceDir,

  // Files to analyze for used CSS - Nx workspace structure
  content: [
    // Main app files
    'apps/connectstore/src/**/*.js',
    'apps/connectstore/src/**/*.jsx',
    'apps/connectstore/src/**/*.ts',
    'apps/connectstore/src/**/*.tsx',
    // All library files (scan any JS/JSX/TSX in any lib)
    'libs/**/src/**/*.js',
    'libs/**/src/**/*.jsx',
    'libs/**/src/**/*.ts',
    'libs/**/src/**/*.tsx',
    // Built assets
    'apps/connectstore/dist/**/*.js',
    'apps/connectstore/dist/**/*.html',
  ],

  // CSS files to process (Vite generates hashed CSS files)
  css: [`${sourceDir}/*.css`],

  // Safelist configuration - Only classes actually used in Connect CLO
  safelist: {
    standard: [
      // Component state classes (used by Bootstrap JS)
      'active',
      'disabled',
      'visually-hidden',
      // Spinner classes (ProductGrid loading states)
      'spinner-border',
    ],
  },
  variables: true,
  keyframes: true,
};
