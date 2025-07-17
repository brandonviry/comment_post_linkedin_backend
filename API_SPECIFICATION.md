# API Specification: LinkedIn Comment Generator

## 1. Overview

This document provides a detailed specification for the LinkedIn Comment Generator API. The API analyzes the content of a LinkedIn post (text and images) and generates a relevant, professional comment using an AI model via OpenRouter.

This backend service is built with Node.js and Express.

## 2. Setup and Installation

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1.  **Clone the repository** or download the source code.

2.  **Navigate to the project directory**.

3.  **Install dependencies**:
    ```bash
    npm install
    ```

*Note: The project includes a `.env.example` file. The variables inside are optional and not required for the API to function.*

## 3. Running the Server

To start the API server, run the following command from the `backand` directory:

```bash
npm start
```

The server will start on the port defined in your configuration (default: `3001`). You will see the message `Server is running on http://localhost:3001` in the console.

## 4. API Endpoint

### POST /api/generate-comment

This is the primary endpoint for generating a LinkedIn comment.

- **Method**: `POST`
- **URL**: `/api/generate-comment`
- **Description**: Accepts the text and optional image URLs from a LinkedIn post and returns a generated comment.

#### Request Body

The request body must be a JSON object with the following structure:

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

**Success (200 OK)**

On a successful request, the API returns a JSON object containing the generated comment.

| Field     | Type     | Description                               |
|-----------|----------|-------------------------------------------|
| `role`    | `String` | The role of the message author (`assistant`). |
| `content` | `String` | The generated comment text.                 |

**Example Success Response:**

```json
{
  "role": "assistant",
  "content": "Excellente sélection ! Le cluster de points est souvent un vrai défi sur les cartes interactives. Avez-vous déjà testé des alternatives pour la gestion de grands volumes de données ?"
}
```

**Error Responses**

- **400 Bad Request**: The request is missing the required `text` field.
  ```json
  {
    "message": "Text content is required."
  }
  ```
- **502 Bad Gateway**: The API failed to get a response from the external OpenRouter service.
  ```json
  {
    "message": "Failed to generate comment from external API."
  }
  ```
- **500 Internal Server Error**: An unexpected server-side error occurred.
  ```json
  {
    "message": "An internal server error occurred."
  }
  ```
