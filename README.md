# Gallery App

This is a Next.js-based image gallery application that fetches and displays images with random sizes and tags. It features infinite scrolling and tag-based filtering.

## Features

- Infinite scroll image loading
- Random image sizes and tags
- Tag-based image filtering
- Responsive grid layout
- Docker support for easy deployment

## Prerequisites

- Node.js (v20 or later)
- npm or yarn
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/tour-panurat/image-gallery.git
   cd image-gallery
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Development Mode

To run the application in development mode:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Mode

To build and run the application in production mode:

```
npm run build
npm start
```

## Docker Deployment

To build and run the application using Docker:

1. Build the Docker image:
   ```
   docker build -t image-gallery .
   ```

2. Run the container:
   ```
   docker run -p 3001:3001 image-gallery
   ```

Alternatively, you can use Docker Compose:

```
docker-compose up
```

The application will be available at `http://localhost:3001`.

## Dependencies

- Next.js
- React
- react-grid-gallery
- react-infinite-scroll-component

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).