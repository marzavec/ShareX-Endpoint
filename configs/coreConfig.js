/*
  Developer: Marzavec ( https://github.com/marzavec )
  Description: Core configuration, global app settings
*/

coreConfig = {
  appName: 'ShareX Endpoint',
  appVersion: '0.0.1a',

  useSSL: false, // turn ssl on if true //
  forceSSL: false, // allow only ssl traffic //
  privateKey: '/etc/letsencrypt/live/share.lyka.pro/privkey.pem', // leave empty if ssl is off //
  certificate: '/etc/letsencrypt/live/share.lyka.pro/cert.pem', // leave empty if ssl is off //

  localPort: 6969 // servers port //
}
