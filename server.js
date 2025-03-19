import express from 'express';
import { createServer } from 'http';
import { toBuffer } from 'qrcode';
import makeWASocket from '@whiskeysockets/baileys'; // أو أي مكتبة تستخدمها لإنشاء `conn`

function connect(conn, PORT) {
  const app = global.app = express();
  const server = global.server = createServer(app);
  let _qr = 'El código QR es invalido, posiblemente ya se escaneo el código QR.';

  conn.ev.on('connection.update', function appQR({ qr }) {
    if (qr) _qr = qr;
  });

  app.use(async (req, res) => {
    res.setHeader('content-type', 'image/png');
    res.end(await toBuffer(_qr));
  });

  server.listen(PORT, () => {
    console.log('[ ℹ️ ] La aplicación está escuchando en el puerto', PORT);
  });
}

function pipeEmit(event, event2, prefix = '') {
  const old = event.emit;
  event.emit = function (event, ...args) {
    old.emit(event, ...args);
    event2.emit(prefix + event, ...args);
  };
  return {
    unpipeEmit() {
      event.emit = old;
    }
  };
}

// إنشاء اتصال WhatsApp
const conn = makeWASocket({ /* خيارات الاتصال */ });
const PORT = process.env.PORT || 6000; // استخدم المنفذ المقدم من Heroku أو 3000 محليًا

connect(conn, PORT);
