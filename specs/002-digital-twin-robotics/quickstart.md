# Quickstart: Digital Twin Robotics Module

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git version control system
- A modern web browser

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

## Adding the Digital Twin Robotics Module

1. Create the module directory:
   ```bash
   mkdir -p docs/digital-twin-robotics
   ```

2. Add the three main chapters to the directory:
   ```bash
   touch docs/digital-twin-robotics/physics-simulation.md
   touch docs/digital-twin-robotics/rendering-twins.md
   touch docs/digital-twin-robotics/sensor-simulation.md
   ```

3. Update the sidebar configuration in `sidebars.js` to include the new module:
   ```js
   module.exports = {
     // ... existing sidebar configuration
     digitalTwinRobotics: [
       {
         type: 'category',
         label: 'Digital Twin Robotics',
         items: [
           'digital-twin-robotics/physics-simulation',
           'digital-twin-robotics/rendering-twins',
           'digital-twin-robotics/sensor-simulation',
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
   git checkout -b 002-digital-twin-robotics
   ```

2. Make changes to the documentation files in `docs/digital-twin-robotics/`

3. Preview your changes by running:
   ```bash
   npm start
   ```

4. When finished, commit and push your changes:
   ```bash
   git add .
   git commit -m "Add digital twin robotics module content"
   git push origin 002-digital-twin-robotics
   ```