<general_rules>
- Always use Prettier for code formatting with the following configuration: semi: true, trailingComma: all, singleQuote: true, printWidth: 70
- When creating new React components, place them in the src/components/ directory using PascalCase naming (e.g., MyComponent.js)
- Use styled-components for all component styling - this is the established pattern throughout the codebase
- Import components using the webpack alias $components for cleaner imports (e.g., import Counter from '$components/Counter')
- When adding new MDX components that should be globally available, register them in src/components/mdx/index.js in the MDXGlobalComponents object
- Follow existing GraphQL query patterns found in the templates/ directory when creating new data-fetching logic
- Use kebab-case for directory names and file paths (e.g., content/blog/my-post/)
- Before creating new utility functions or components, search the existing codebase to avoid duplication
- Main development scripts: 'npm run develop' for development server, 'npm run build' for production builds
</general_rules>

<repository_structure>
This is a Gatsby.js-based personal portfolio website with MDX blog functionality. The repository is structured as follows:

- **src/**: Main source code directory
  - **components/**: Reusable React components, including MDX components in mdx/ subdirectory
  - **pages/**: Static page components (index.js, 404.js)
  - **templates/**: Dynamic page templates for blog posts, categories, and blog listing
- **content/blog/**: MDX blog posts organized in individual directories with frontmatter metadata
- **pics/**: Photography portfolio organized by shoot folders (e.g., Malaika_Shoot/, Mangosteen_Shoot/)
- **public/**: Generated build output (auto-generated, not tracked in git)
- **gatsby-config.js**: Site configuration, plugins, and metadata
- **gatsby-node.js**: Dynamic page generation logic and webpack configuration including $components alias
- **.prettierrc**: Code formatting configuration

The site uses MDX for blog content with custom React components, GraphQL for data fetching, and dynamic page generation for blog posts and categories.
</repository_structure>

<dependencies_and_installation>
- Package Manager: npm (package-lock.json present)
- Install dependencies: `npm install`
- Main development scripts:
  - `npm run develop`: Start development server with hot reloading
  - `npm run build`: Create production build
- Key dependencies include Gatsby.js, MDX, styled-components, and various Gatsby plugins for image processing and PWA functionality
- No additional setup steps required after npm install
</dependencies_and_installation>

<testing_instructions>
No testing framework is currently configured in this repository. There are no existing test files, Jest configuration, or testing scripts in package.json. If testing needs to be added in the future, consider setting up Jest with React Testing Library for component testing and integration tests for Gatsby pages.
</testing_instructions>

<pull_request_formatting>
</pull_request_formatting>
