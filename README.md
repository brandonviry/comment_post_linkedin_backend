# LinkedIn Comment Generator API
# LinkedIn Comment Generator - Backend API

This is the backend service for the LinkedIn Comment Generator browser extension. It's a Node.js/Express API that receives content from a LinkedIn post and uses an AI model via [OpenRouter](https://openrouter.ai/) to generate relevant, professional comments.

## Features

- **Dynamic Comment Generation**: Analyzes post text and images to create contextual comments.
- **Secure**: Uses Helmet for basic security headers.
- **Configurable CORS**: Allows restricting access to specific frontend URLs in production.
- **Ready for Production**: Can be easily deployed and managed with a process manager like PM2.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

---

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd comment_post_linkedin_backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

*Note: The project includes a `.env.example` file. The variables inside (`YOUR_SITE_URL`, `YOUR_SITE_NAME`) are optional and used for statistics with OpenRouter. They are not required for the API to function.*

---

## Running the Server

To start the server for local development, run:

```bash
npm start
```

The API will be available at `http://localhost:3001`.

---

## API Endpoint

### POST `/api/generate-comment`

This is the primary endpoint for generating a LinkedIn comment.

- **Method**: `POST`
- **Description**: Accepts the text and optional image URLs from a LinkedIn post, along with an OpenRouter API key, and returns a generated comment.

#### Request Body

| Field       | Type           | Required | Description                                       |
|-------------|----------------|----------|---------------------------------------------------|
| `text`      | `String`       | Yes      | The text content of the LinkedIn post.            |
| `imageUrls` | `Array<String>`| No       | An array of URLs for the images in the post.      |
| `apiKey`    | `String`       | Yes      | Your secret API key from OpenRouter.              |

**Example Request:**

```json
{
  "text": "Voici 4 plugins Leaflet qui m’ont fait gagner des jours de dev.",
  "imageUrls": [
    "https://media.licdn.com/dms/image/v2/D4D22AQFX75zmyjeOHg/feedshare-shrink_800/B4DZgSJEA4GsAk-/0/1752651023692?e=1755734400&v=beta&t=zbrmytPBbvljBBvzNDKYCAz35LT51XJHKWh8o-ShsfA"
  ],
  "apiKey": "your-openrouter-api-key"
}
```

#### Responses

- **200 OK (Success)**
  ```json
  {
    "role": "assistant",
    "content": "Excellente sélection ! Le cluster de points est souvent un vrai défi sur les cartes interactives. Avez-vous déjà testé des alternatives pour la gestion de grands volumes de données ?"
  }
  ```

- **400 Bad Request** (e.g., missing `text` or `apiKey`)
  ```json
  {
    "message": "Text content is required."
  }
  ```

- **5xx Server Error** (e.g., problem with the OpenRouter API)
  ```json
  {
    "message": "Failed to generate comment from external API."
  }
  ```

---

## Deployment

For production, it is highly recommended to use a process manager like **PM2** to keep the application alive.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the application
pm2 start index.js --name linkedin-api

# Ensure the app restarts on server reboot
pm2 startup
```
## Running the server

```bash
npm start
```

The server will start on `http://localhost:3001`.

## API Endpoint

### `POST /generate-comment`

Generates a LinkedIn comment.

**Request Body:**

```json
{
  "text": "This is the content of the LinkedIn post.",
  "imageUrls": [
    "https://example.com/image1.jpg"
  ],
  "apiKey": "your-openrouter-api-key"
}
```

**Success Response:**

```json
{
    "role": "assistant",
    "content": "This is a generated comment."
}
```
