# Quickstart: Isaac Robotic Brain Module

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git version control system
- Basic understanding of robotics concepts
- Familiarity with simulation environments (preferred but not required)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Navigate to the website directory:
   ```bash
   cd website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The development server will start and open the Docusaurus site in your browser at `http://localhost:3000`.

## Adding the Isaac Robotic Brain Module

1. Create the module directory:
   ```bash
   mkdir -p docs/isaac-robotic-brain
   ```

2. Add the three main chapters to the directory:
   ```bash
   touch docs/isaac-robotic-brain/isaac-sim-synthetic-data.md
   touch docs/isaac-robotic-brain/accelerated-perception-vslam.md
   touch docs/isaac-robotic-brain/humanoid-navigation-nav2.md
   ```

3. Update the sidebar configuration in `sidebars.js` to include the new module:
   ```js
   module.exports = {
     // ... existing sidebar configuration
     isaacRoboticBrain: [
       {
         type: 'category',
         label: 'Isaac Robotic Brain',
         items: [
           'isaac-robotic-brain/isaac-sim-synthetic-data',
           'isaac-robotic-brain/accelerated-perception-vslam',
           'isaac-robotic-brain/humanoid-navigation-nav2',
         ],
       },
     ],
   };
   ```

4. Add the module to the Docusaurus configuration in `docusaurus.config.js`:
   ```js
   module.exports = {
     // ... existing config
     presets: [
       [
         'classic',
         /** @type {import('@docusaurus/preset-classic').Options} */
         ({
           docs: {
             sidebarPath: require.resolve('./sidebars.js'),
             // ... other docs config
           },
           // ... other preset config
         }),
       ],
     ],
     // ... rest of config
   };
   ```

## Building for Production

To build the site for production:

```bash
npm run build
```

This will generate a `build` directory with the statically generated site that can be deployed to any web server or hosting platform.

## Running Tests

To run the tests for the application:

```bash
npm test
```

## Local Development Workflow

1. Create a new branch for your changes:
   ```bash
   git checkout -b 003-isaac-robotic-brain
   ```

2. Make changes to the documentation files in `docs/isaac-robotic-brain/`

3. Preview your changes by running:
   ```bash
   npm start
   ```

4. When finished, commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Isaac robotic brain module content"
   git push origin 003-isaac-robotic-brain
   ```