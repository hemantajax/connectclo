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

  // Safelist configuration for Bootstrap 5 + Connect CLO Components
  safelist: {
    standard: [
      // Core Bootstrap state classes
      /^active$/,
      /^disabled$/,
      /^fade$/,
      /^col/,

      // Critical state classes for Bootstrap components
      'active',
      'disabled',
      'visually-hidden',

      // Card structural classes (CRITICAL - heavily used in app)
      'card',
      'card-body',
      'card-title',
      'card-text',
      'card-img-top',
      'card-dark', // Custom theme class
      'h-100', // Used for card height

      // Form structural classes (CRITICAL - used in filters)
      'form-check',
      'form-check-input',
      'form-check-label',
      'form-check-inline',
      'form-control',
      'form-label',
      'form-select',
      'form-select-sm',
      'input-group',
      'input-group-sm',
      'input-group-text',

      // Button classes (used throughout app)
      /^btn/,
      'btn',
      'btn-sm',
      'btn-outline-light',
      'btn-outline-secondary',

      // Alert classes (used for errors and info)
      'alert',
      'alert-info',
      'alert-danger',
      'alert-heading',
      'alert-sm',

      // Badge classes (used for counts)
      'badge',
      'bg-secondary',
      'bg-primary',

      // Layout utility classes (heavily used)
      /^d-/, // Display utilities
      /^flex-/, // Flex utilities
      /^justify-/,
      /^align-/,
      /^mb-/, // Margin bottom
      /^me-/, // Margin end
      /^ms-/, // Margin start
      /^mt-/, // Margin top
      /^pb-/, // Padding bottom
      /^px-/, // Padding horizontal
      /^py-/, // Padding vertical
      /^gap-/, // Gap utilities
      /^g-/, // Grid gap

      // Background and text utilities (used in dark theme)
      /^bg-/,
      /^text-/,
      'text-light',
      'text-muted',
      'text-primary',
      'bg-dark',
      'border-secondary',

      // Animation/transition classes
      /^transition/,

      // Bootstrap Icons (used throughout app)
      /^bi-/,

      // Position utilities
      'position-absolute',
      'position-relative',

      // Sizing utilities
      /^w-/,
      /^h-/,
      'min-vh-100',

      // Responsive utilities
      /^col-/, // All column classes
      'container-fluid',
      'row',

      // Placeholder classes (used in loading states)
      'placeholder',
      'placeholder-glow',

      // Opacity utilities
      /^opacity-/,

      // Rounded utilities
      /^rounded/,

      // Z-index utilities (might be used dynamically)
      /^z-/,
    ],
    deep: [
      // Spinner/Loading patterns (used in ProductGrid)
      /spinner/,

      // Card patterns
      /card/,

      // Form patterns
      /form/,

      // Button patterns
      /btn/,

      // Alert patterns
      /alert/,
    ],
    greedy: [
      // Loading states (CRITICAL - used in ProductGrid)
      /spinner-border/,
      /spinner-grow/,

      // Bootstrap Icons (all variants)
      /bi-/,

      // Grid and layout (all responsive variants)
      /^col-/,
      /^row/,
      /^container/,

      // Background colors (all variants)
      /^bg-/,

      // Text colors (all variants)
      /^text-/,

      // Border utilities
      /^border/,

      // Flex utilities (all variants)
      /^d-flex/,
      /^flex-/,
      /^justify-/,
      /^align-/,
    ],
  },
  variables: true,
  keyframes: true,
};
