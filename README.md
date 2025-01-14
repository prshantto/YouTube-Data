# YouTube Transcript API

A simple Express.js server to fetch YouTube video details using the SerpApi.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

You need to have the following software installed on your computer:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/prshantto/YouTube-Transcript.git
cd youtube-transcript
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your SerpApi API key:

```bash
API_KEY=your_serpapi_api_key
```

### Running the Server

To start the server, use the following command:

```bash
npm start
```

For development with hot-reloading, use:

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

### API Endpoints

#### Fetch YouTube Video Details

`GET /`

**Query Parameters:**

- `url` (string): The YouTube video URL.

**Example Request:**

```http
GET http://localhost:3000/?url=https://www.youtube.com/watch?v=VIDEOID12345
```

**Example Response:**

```json
{
  "title": "Sample Title",
  "description": "Sample Description",
  "thumbnail": "Sample Thumbnail URL"
}
```

### Built With

- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [SerpApi](https://serpapi.com/) - A real-time API to access Google search results
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file
- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware
- [nodemon](https://nodemon.io/) - A utility that monitors for any changes in your source and automatically restarts your server

### Author

- **Prashant** - [prshantto](https://github.com/prshantto)
