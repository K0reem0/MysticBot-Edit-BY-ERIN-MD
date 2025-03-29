import fs from 'fs'

let handler = async (m, { conn }) => {
    let menu = `
*❃ ────────⊰ ❀ ⊱──────── ❃*
                          *الــدــيــن*
*❃ ────────⊰ ❀ ⊱──────── ❃* 

> *◍ آيه*
> *◍ حديث*
> *◍ دين*
> *◍ قران*
> *◍ تلاوة*
> *◍ سوره*
> *◍ الله* 

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
handler.command = /^(قسم-ديني)$/i 

export default handler
