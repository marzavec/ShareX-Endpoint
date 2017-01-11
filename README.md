# README ShareX-Endpoint

Customizable image (png, jpg, gif) storage application written in Node JS, designed with ShareX in mind. Optional HTTPS mode, magic number file verification for security, multi-user setup.

## Installation

Prerequisites: [Node.js](https://nodejs.org/en/)

Clone this git then:

Edit config/coreConfig.js to change server port or ssl key & certificate locations.

Edit config/sharexConfig.js to change / create users, change file storage location or server output (url).

Edit config/sqlConfig.js to add sql credentials.

```
sh
cd [clone dir]
npm install // atm no package file //
sudo node main.js
```

## Usage

Upload to remote server.
Deploy using pm2 (if you want).
Apply reverse proxy (if you want).

Make changes to the following, copy and import from clipboard as a destination:

```
{
  "Name": "Share.Lyka.Pro",
  "RequestType": "POST",
  "RequestURL": "http://share.lyka.pro:6969/",
  "FileFormName": "thePic",
  "Arguments": {
    "user": "test",
    "pass": "1234"
  },
  "ResponseType": "LocationHeader"
}
```

## Support

Having issues? [Open an issue](https://github.com/marzavec/ShareX-Endpoint/issues/new) for support.

## Contributing

Feel free to contribute using [Github Flow](https://guides.github.com/introduction/flow/). Fork this project, add commits, and then [open a pull request](https://github.com/marzavec/ShareX-Endpoint/compare/).
