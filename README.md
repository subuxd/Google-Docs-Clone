# Google Docs Clone

This is a Google Docs clone built using <b>React, Quill, and Socket.io</b>. It allows real-time collaboration and document editing among multiple users.

## Features

- Real-time collaboration: Multiple users can collaborate and edit the same document simultaneously.
- Rich text editing: The Quill editor is used to provide a robust and intuitive interface for text formatting.
- Real-time updates: Changes made by any user are instantly reflected in the document for all other connected users using socket.io.

## Screenshots

When Both browsers have the same ID, so any changes made in one document are automatically reflected in the other.

![1](https://github.com/subuxd/google-docs-clone/assets/103200387/246d7c56-1b28-4dca-84d6-83565296c8a6)

When the ID is unique, any changes made in one document do not affect or propagate to the other.

![2](https://github.com/subuxd/google-docs-clone/assets/103200387/c6432119-2037-4b5e-b1c8-86c8a23ccba7)


## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/google-docs-clone.git
```
## Client Setup and Usage

1. Navigate to the client directory:
```cd google-docs-clone/client```

2. Install the dependencies:
```npm install```

3. Start the client:
```npm start```

4. Access the client application in your browser at `http://localhost:3000`

## Server Setup and Usage

1. Navigate to the server directory:
`cd google-docs-clone/server`

2. Install the dependencies:
`npm install`

3. Start the server:
`npm start`

4. The server will run on `http://localhost:3001`

Start using the google docs !!!

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please submit an issue or create a pull request.



