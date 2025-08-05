module.exports = {
  // Project type: Static website
  projectType: "website",
  
  // Framework: Vanilla HTML/CSS/JS
  framework: "none",
  
  // Development server configuration
  devServer: {
    port: 3000,
    open: true
  },
  
  // Build configuration
  build: {
    outDir: "dist",
    assetsDir: "assets"
  },
  
  // Linting configuration
  linting: {
    html: true,
    css: true,
    js: true,
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn"
    }
  },
  
  // Prettier configuration
  prettier: {
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    printWidth: 80,
    trailingComma: "es5"
  },
  
  // Ignore patterns
  ignore: [
    "dist/",
    "node_modules/",
    ".git/",
    "*.log"
  ],
  
  // GitHub Pages deployment
  deployment: {
    platform: "github-pages",
    branch: "main",
    folder: "/"
  },
  
  // File associations
  fileAssociations: {
    "*.html": "html",
    "*.css": "css",
    "*.js": "javascript"
  }
}; 