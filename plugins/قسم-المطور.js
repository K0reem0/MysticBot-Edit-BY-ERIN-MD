import fs from 'fs'

let handler = async (m, { conn }) => {
    let menu = `
*❃ ────────⊰ ❀ ⊱──────── ❃*
                               *آرثر*
*❃ ────────⊰ ❀ ⊱──────── ❃* 

> *◍ ضيف_بريميام*
> *◍ حذف_بريميام*
> *◍ بان*
> *◍ بان_فك*
> *◍ بان_شات*
> *◍ بان_شات_فك*
> *◍ حطها*
> *◍ ايقاف*
> *◍ اشغيل*
> *◍ المبندين*
> *◍ إعادة*
> *◍ اعادةتشغيل*
> *◍ ادخل*
> *◍ اخرج*
> *◍ ضيف_اكس_بي*
> *◍ ضيف_جواهر*
> *◍ ارثر-عرض*
> *◍ ارثر-تعديل*
> *◍ ارثر-اضافه*
> *◍ ارثر-حذف*
> *◍ ارثر-الكل* 

*❃ ────────⊰ ❀ ⊱──────── ❃*`

    let imgUrl = 'https://i.pinimg.com/736x/2c/7e/38/2c7e38df985a1f5aa1b1f43418d8ab07.jpg'

    try {
        await conn.sendMessage(m.chat, { 
            image: { url: imgUrl }, 
            caption: menu 
        }, { quoted: m })

        console.log('Image sent successfully')
    } catch (e) {
        console.error(e)
        conn.reply(m.chat, '❌ Failed to send image', m)
    }
}

handler.help = ['main']
handler.tags = ['group']
handler.command = /^(قسم-المطور)$/i 

export default handler
